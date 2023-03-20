package com.jsdckj.ttarawa.history.controller;

import com.jsdckj.ttarawa.history.dto.req.HistoryReqDto;
import com.jsdckj.ttarawa.history.dto.req.HistoryUpdateReq;
import com.jsdckj.ttarawa.history.dto.res.HistoryResDto;
import com.jsdckj.ttarawa.history.service.FavoriteService;
import com.jsdckj.ttarawa.history.service.HistoryService;
import com.jsdckj.ttarawa.util.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/history/post")
@RequiredArgsConstructor
@Tag(name = "History", description = "주행기록 API")
public class HistoryController {

  private final HistoryService historyService;
  // post //

  // 게시물 저장
  @Operation(summary = "주행 기록 저장 API")
  @PostMapping("/{user_id}")
  public ResponseEntity<?> insertHistory(@PathVariable("user_id") Long userId, @RequestPart MultipartFile image, @RequestPart HistoryReqDto historyReqDto) {
    historyService.insertHistory(userId, image, historyReqDto);
    return Response.ok("게시물 저장 성공");
  }

  // 게시물 1개 조회
  @Operation(summary = "게시물 1개 조회 API")
  @GetMapping("/detail/{history_id}")
  public ResponseEntity<?> selectOneHistory(@PathVariable("history_id") Long historyId) {
    Long userId = 38L; // 현재 유저 가져오기 -> jwt 복호화 하는 메소드 추가 해야함
    HistoryResDto historyResDto = historyService.selectOneHistory(userId, historyId);
    if (historyResDto != null) {
      return Response.makeResponse(HttpStatus.OK, "게시물 상세 조회 성공", historyResDto);
    } else {
      return Response.badRequest("게시물 없음");
    }
  }

  // 게시물 목록 조회
  @Operation(summary = "게시물 목록 조회 API")
  @GetMapping
  public ResponseEntity<?> selectAllHistory(Pageable pageable) {
    Long userId = 38L; // 현재 유저 가져오기 -> jwt 복호화 하는 메소드 추가 해야함
    return Response.makeResponse(HttpStatus.OK, "게시물 조회에 성공했습니다", historyService.selectAllHistory(userId, pageable));
  }

  // 내 주행기록 조회
  @Operation(summary = "내 주행 기록 목록 조회 API")
  @GetMapping("/{user_id}")
  public ResponseEntity<?> selectAllMyHistory(@PathVariable("user_id") Long userId, @PageableDefault(sort="createdDate",direction= Sort.Direction.DESC) Pageable pageable){

    return Response.makeResponse(HttpStatus.OK, "내 주행 기록 조회에 성공했습니다", historyService.selectAllMyHistory(userId, pageable));

  }


  // 게시물 수정
  @Operation(summary = "게시물 수정 API")
  @PutMapping("/post/{user_id}")
  public ResponseEntity<?> updateHistory(@PathVariable("user_id") Long userId, @RequestParam("history_id") Long historyId, @RequestBody HistoryUpdateReq historyUpdateReq) {
    if (historyService.updateHistory(userId, historyId, historyUpdateReq))
      return Response.ok("게시물 수정 성공");
    else
      return Response.badRequest("게시물 수정 실패 - 사용자 불일치");
  }


  // 게시물 삭제
  @Operation(summary = "게시물 삭제 API")
  @DeleteMapping("/post/{user_id}")
  public ResponseEntity<?> deleteHistory(@PathVariable("user_id") Long userId, @RequestParam("history_id") Long historyId) {
    historyService.deleteHistory(userId, historyId);
    return Response.ok("게시물 삭제 성공");
  }


}