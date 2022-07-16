# Mind Note

> 일기장 웹앱을 개발합니다.

## 목차

1. [빠른 시작](#빠른-시작)
2. [서버 설명](#서버-설명)
3. [프로젝트 구현 기능](#프로젝트-구현-기능)
4. [기술 스택](#기술-스택)
5. [폴더구조](#폴더구조)
6. [절대경로 설정](#절대경로-설정)
7. [페이지 및 기능 설명](#페이지-및-기능-설명)

# 빠른 시작

```
git clone https://github.com/Gryffindor0ne/mind_note.git
npm install
npm run dev
```

# 서버 설명

- 본 프로젝트는 json-server를 Mock server로 사용하였습니다.

```
"scripts": {
    "server": "json-server --watch db.json --port 4000",
  }
```

- 또 리액트 개발 서버와 json-server를 동시에 구동시키기 위해 concurrently 라이브러리를 사용하였습니다.

```
 "dev": "concurrently \"npm start\" \"npm run server\""
```

```
npm run dev
```

- npm run dev 만 실행하여도 동시에 구동 가능합니다.

# 프로젝트 구현 기능

1. 유저는 일기 목록을 간략하게 볼 수 있습니다.

   - 일기장 앱 첫 페이지를 일기 목록으로 구성하였습니다.

   - 유저가 최신 날짜순으로 일기 목록을 간략하게 볼 수 있도록 구성하였습니다.

   <br>

2. 유저가 일기를 쓸 수 있습니다.

   - 새 글 작성페이지에서 유저는 제목, 태그, 본문을 입력하여 새 일기를 작성할 수 있도록 하였습니다.

   - 새 글을 등록하면 자동으로 현재 날짜가 입력되도록 구현하였습니다.

<br>

3. 원하는 일기 선택시 상세 내용을 볼 수 있습니다.

   - 일기 목록페이지에서 원하는 일기를 클릭하면 일기 상세페이지로 이동하여 해당 일기의 내용을 자세히 볼 수 있습니다.

<br>

4. 일기 목록에서 특정 날짜 범위를 지정할 수 있습니다.

   - 일기 목록페이지에서 원하는 날짜 범위를 지정하면 해당 날짜 범위의 일기 목록만 볼 수 있도록 구현하였습니다.

<br>

5. 태그 선택하면 해당 태그가 포함된 일기 목록을 볼 수 있습니다.

   - 일기의 태그를 클릭하면 해당 태그만이 포함된 일기 목록만을 볼 수 있도록 구현하였습니다.

<br>

# 기술 스택

- 언어
  - HTML, CSS, TypeScript
- 라이브러리
  - React(18), React-Router-Dom, Craco, dayjs, sweetalert2
- 스타일
  - Styled-Components, Material-UI
- 서버 통신
  - Axios, Json-server, Concurrently

# 폴더 구조

```
mind_note/
├── public
│   ├── logo192.png
│   ├── logo512.png
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── components
│   │   ├── DateRangeFinder.tsx
│   │   ├── Header.tsx
│   │   ├── SummaryDiary.tsx
│   │   └── Tags.tsx
│   ├── contexts
│   │   └── PostsContext.tsx
│   ├── pages
│   │   ├── Diary.tsx
│   │   ├── List.tsx
│   │   └── NewDiary.tsx
│   ├── utils
│   │   ├── dateUtils.ts
│   │   └── listSorts.ts
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── .gitignore
├── craco.config.js
├── db.json
├── package-lock.json
├── package.json
├── README.md
├── server.js
├── tsconfig.json
└── tsconfig.paths.json
```

# 절대경로 설정

```
{
    "compilerOptions": {
        "baseUrl": "./src",
        "paths": {
            "@components/*": [
                "components/*"
            ],
            "@pages/*": [
                "pages/*"
            ],
            "@utils/*": [
                "utils/*"
            ],
            "@contexts/*": [
                "contexts/*"
            ]
        }
    }
}
```

# 페이지 및 기능 설명

## 일기 목록 페이지 ("/diary")

- 해당 앱의 첫 페이지입니다.

- 일기 목록을 최신순으로 간략하게 보여줍니다.

  - 일기 목록의 제목을 클릭하면 해당 일기의 상세페이지로 이동합니다.
  - 일기 목록의 태그를 클릭하면 해당 태그가 포함된 일기만 필터링하여 보여집니다.

- `전체 글 보기` 버튼을 클릭하면 일기 목록 전체 내용을 표시합니다.

- 날짜 범위를 입력하면 해당 날짜 범위에 해당하는 일기만 필터링되어 보여집니다.

## 일기 상세페이지 ("/diary/[해당 일기 아이디])

- 선택된 일기의 모든 내용을 볼 수 있습니다.

- 해당 일기에 포함된 태그를 클릭하면 해당 태그별 일기 목록으로 이동합니다.

- `글 목록으로` 버튼을 클릭하면 일기 목록페이지로 돌아갑니다.

## 일기 작성페이지("/diary/new")

- 제목, 태그, 본문을 입력하여 새 일기를 작성할 수 있습니다.

- 태그 입력란에 원하는 태그를 적어 엔터키를 누르면 태그가 추가됩니다.

  - 입력된 태그는 `x`버튼을 클릭할 시 삭제 가능합니다.

- 새 일기는 제목과 본문의 내용이 없으면 등록되지 않습니다.

- 등록버튼을 눌러 새 일기를 작성하면 작성된 날짜가 자동으로 입력됩니다.

## Header

- 앱 이름 `Mind Note`와 `새 일기 쓰기`버튼으로 구성되어 있습니다.

- 앱 이름 `Mind Note`를 클릭하면 일기 목록 전체보기가 가능합니다.

- `새 일기 쓰기`버튼을 클릭하면 새 일기 작성페이지로 이동합니다.
