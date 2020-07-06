# How to Contribute

## 로컬 개발 환경 설정

```
git clone https://github.com/woowa-techcamp-2020/market-11.git

cd market-11
```

## 브랜치 규칙

- `master` : `develop`에서 Pull Request한 커밋만 반영함
- `develop` : `master`에서 분기, 프로젝트 종료시 `master`로 merge
- `frontend` : `develop`에서 분기, 한 화면이 완성되면 `develop` 브랜치로 merge
- `backend` : `develop`에서 분기, 완성시 `develop` 브랜치로 merge
- `feature/issue-#` : `frontend` 또는 `backend`에서 분기, 기능 완성시 `frontend` 또는 `backend` 브랜치로 merge
- `document` : `develop`에서 분기, 문서 완성시 `develop`으로 merge

## 커밋 규칙

> [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)을 따릅니다.

- 커밋 메시지에 타입별 머릿말 붙이기

### 가능한 타입명

- `docs` : 문서와 관련된 커밋입니다.
- `feat` : 기능 개발과 관련된 커밋입니다.
- `fix` : 버그 해결과 관련된 커밋입니다.
- `refactor` : 코드 리팩토링과 관련된 커밋입니다.

## Pull Request 규칙

[PR 템플릿](./.github/PULL_REQUEST_TEMPLATE.md)에 따라 작성

- 리뷰어에 상대방 추가
- 리뷰어가 코드 확인후 `Squash and merge`
- 상대방 코드 적극적으로 코멘트해주기
- PR과 관련된 label 추가하기

## 파일명 / 폴더명 명명규칙

> 케밥 케이스
