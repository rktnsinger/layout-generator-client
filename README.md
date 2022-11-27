# 📐 Layout generator

![ezgif com-gif-maker](https://user-images.githubusercontent.com/96766719/204136445-9f571a02-bc26-4fc5-a621-fa3d04ecc4c8.gif)

## 🙌🏽 Overview

레이아웃을 구성하는 일은 웹 개발에서 빼놓을 수 없는 작업중 하나입니다. UI에는 사용자가 원하는 정보들이 적재적소에 잘 배치되어야 하는데, 이 배치 공간을 구성하는 기본 밑바탕이 바로 레이아웃이기 때문이죠.

하지만 막상 레이아웃 작업을 하다보면 은근히 손이 많이가고 시간도 생각보다 더 소요됩니다. 또 어떠한 형태가 좋을지 감이 안잡혀 목업을 검색하느라 더 오래 걸립니다. 게다가 빡빡한 일정 안에 구현해내야 할 기능들이 산더미처럼 많아 마음은 조급해지고... 그냥 예시 이미지를 줄테니 누가 대신 빠르게 만들어주면 좋겠다는 생각이 들곤 합니다.

바로 이러한 생각에서, 본 프로젝트는 출발하게 되었습니다. Layout Generator는 목업 이미지로부터 레이아웃 구조를 인식하여 HTML과 CSS 코드를 생성해주는 웹서비스입니다.

> ___그저 레이아웃을 추출하고 싶은 이미지를 업로드 하고, 미리보기로 확인한 뒤, 생성된 코드를 복사하면 끝입니다!___

  ### Deploy: [Layout generator](https://grand-granita-ccb492.netlify.app/)

  ### Contents

  - 🧐 [How it works](https://github.com/rktnsinger/layout-generator-client#-how-it-works)
  - 🧗🏼‍♂️ [What I challenge about](https://github.com/rktnsinger/layout-generator-client#%EF%B8%8F-what-i-challenge-about)
  - 📝 [Dev Log](https://github.com/rktnsinger/layout-generator-client#-dev-log)
    - [Weekly work](https://github.com/rktnsinger/layout-generator-client#weekly-work-221107--221127)
    - [What I realized & learned](https://github.com/rktnsinger/layout-generator-client#what-i-realized--learned)
  - 💻 [More Description](https://github.com/rktnsinger/layout-generator-client#more-description)

---

<br/>

## 🧐 How it works

|||
| ------------- | ------------- |
|1. 원본 이미지를 '행렬(matrix)'의 형태로 변환 (Image -> Canvas API -> OpenCv Mat class).|2. Grayscale 변환 및 가장자리 검출 (Canny Edge Detection).|
| <img width="450" alt="ex-01-image-load" src="https://user-images.githubusercontent.com/96766719/204136686-bea2468c-c210-458b-aee2-f45e45d2aa23.jpg">Photo by <a href="https://unsplash.com/@teamnocoloco?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Team Nocoloco</a> on <a href="https://unsplash.com/s/photos/webpage?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>|<img width="750" alt="ex-02-canny-edge-detection" src="https://user-images.githubusercontent.com/96766719/204136727-31402f79-a42d-4bfa-ab70-47e2a47363ba.png">|

||
|:-:|
|3. 전처리된 이미지의 픽셀 중 "직선"의 성격을 가지며 일정 길이 이상인 데이터 집합을 필터링 한 후, 그 중 필요없는 선분을 다시 한 번 필터링한 뒤 화면에 표시 (Probabilistic Hough Transform).|
| <img width="600" alt="ex-03-hough-transform" src="https://user-images.githubusercontent.com/96766719/204136735-f40c2151-f146-4d1f-be3c-5bae260c25cf.png">|
|4. 인식된 선분의 좌표와 이미지의 너비, 높이를 기반으로 각 레이아웃 구획이 차지하는 비율을 계산한 후, 그 값을 이용하여 CSS `grid` 속성을 동적으로 생성(`string`). 마지막으로 이 `grid` 속성을 순차적으로 부여한 `<div>` 태그를 동적으로 생성하여 미리보기 렌더링 및 해당 코드를 사용자에게 전달.|
|<img width="600" alt="ex-04-result" src="https://user-images.githubusercontent.com/96766719/204136741-a783a413-8c33-4e33-810f-ba0b00162449.png">|

<br/>

## 🧗🏼‍♂️ What I challenge about

### 1. 머신러닝외에 다른 방법이 있을까?

프로젝트 기획 초반에는 텐서플로우의 object detection 기능을 통해 레이아웃 구획을 검출한 뒤 해당 데이터를 코드화 하면 되겠다고 구상하였지만, 이는 시작점부터 잘못된 계획이었다는 것을 머지않아 깨달았습니다. 머신러닝은 기술적인 문제를 쉽게 해결해주는 마법이 아니라, 방대한 데이터를 학습한 뒤 이를 기반으로 일반화된 결과를 추론해 내는 일종의 알고리즘과 같은 것이었습니다.

머신러닝을 적용하려면 우선 본 프로젝트에서 요구되는 기술적 문제를 해결하도록 사전에 미리 학습된 머신러닝 모델이 필요했습니다. 직접 학습시키는 방안도 있었으나, 3주라는 기간 내에 의미있는 결과를 낼만한 양의 데이터를 구축 및 라벨링하여 학습시키는 것은 시간적, 자원적으로 무리라고 판단하여 고려하지 않았습니다. 문제는 "레이아웃 인식"과 관련하여 사전 훈련된 모델을 찾을 수 없었던 점입니다. 일부 유사한 작업을 하는 파이썬 모델은 있었으나(서면 문서에서 제목이나 단락 검출, 목업 이미지에서 버튼, 인풋과 같은 UI 요소 검출) 레이아웃을 인식한다는건 조금 다른 문제였습니다.

사실 이 시점에서 프로젝트 주제를 다시 생각해야될까라는 고민도 잠시 들었지만, __"방법은 하나가 아니다"__ 라는 부트캠프에서의 가르침을 되새기며 다시 처음부터 조사를 이어나갔습니다. 그러던 중 "컴퓨터 비전" 분야에 대한 글을 접했고, 흔히 사용하는 카메라 필터링 어플과 같이 사진, 영상을 제어하는 기술들의 많은 부분이 비전 기술을 바탕으로 구현되었다는 것을 알게 되었습니다. 또한 자바스크립트에서는 Canvas API를 통해 이미지 파일의 픽셀 데이터를 조작할 수 있었기 때문에, 이 방식들을 잘 응용하면 본 프로젝트의 요구 사항들을 수행해 낼 수 있겠다는 생각이 들었습니다. 이후 작업과 조사를 병행하며 노력한 끝에, 위의 [How it works](https://github.com/rktnsinger/layout-generator-client/edit/develop/README.md#-how-it-works)에서 소개한 방식으로 프로젝트를 구현할 수 있었습니다.

### 2. 하나의 직선이 인접한 여러개의 선분으로 인식되던 문제

기본적인 직선 인식에는 성공했지만, 이미지의 크기나 해상도, 선명도 등의 조건이 너무나도 다양했기에 원하는 선분들만 콕 집어서 추출해내기에는 어려움이 있었습니다. 이미지상에서는 한 줄로 보이지만 경우에 따라 2, 3개의 인접한 선으로 인식되기도 했고, 레이아웃 내부에 스크롤바가 있을 경우 당연하게도 두 개의 선분으로 검출되어 별도의 레이아웃 영역으로 인식되기도 하였습니다. 이에 인접한 선분들은 하나를 제외하고는 모두 제거하는 과정이 있어야 이후의 작업이 수월할 것으로 판단했고, 선분을 필터링할 기준과 방법에 대한 고민 끝에 아래와 같은 알고리즘을 작성하여 적용하였습니다.

먼저 인식된 선분들을 각각 행과 열로 나눈 뒤, 좌표값에 따라 수평선은 상 -> 하 순으로, 수직 선은 좌 -> 우 순으로 정렬 하였습니다. 이후 각 행과 열을 별도로 순회하며 현재 선분과 이전 선분의 좌표값 차이가 일정 범위 내에 있는 경우, 해당 선분은 이전에 이미 인식된 선분과 인접해있는 것으로 판단하고 버리도록 하였습니다. 또한 추가적으로 이미지의 가장 바깥 테두리가 선으로 인식되는 경우도 발견되어, 테두리로부터 일정 margin값 이내의 위치에서 인식된 선분도 마찬가지로 버리도록 하였습니다. 이 작업을 통해 결과적으로 레이아웃 추출에 필요한 선분 데이터들만 선별해낼 수 있었습니다.

### 3. 일단 인식은 됐는데, 이걸 어떻게 코드로..?

이번 프로젝트에서 가장 오랜 시간을 들여야 했던 부분입니다. 기획 당시에는 "픽셀 데이터로 레이아웃 구획의 너비, 높이를 알 수 있으니 이를 적용한 `<div>` 태그를 생성하면 되겠다" 라고 생각하였습니다. 하지만 막상 작업을 시작해보니 이 방법을 통해 컴포넌트와 같은 개별적인 요소를 만들 수는 있었지만, 화면 전체의 구획을 나누는 것은 예상과는 전혀 다른 문제였습니다. 무엇보다도 너비, 높이 등의 형태에 대한 수치가 아닌 `display` 속성이 추가되어야 비로소 화면 전체의 레이아웃을 잡을 수 있겠다는 사실을 깨달은 뒤에는, 이러다 프로젝트를 끝내지 못할 수도 있다는 걱정까지 앞섰습니다. 급한 마음에 머신러닝에서 힌트를 얻을 수 있지 않을까 다시 살펴보았지만, 이 역시 "UI 요소와 HTML 코드를 1:1로 매칭"하여 데이터셋을 구축한 뒤 이를 학습시켜 이미지에서 코드를 추출해내는 것이었기에 도움 될만한 단서를 얻지는 못했습니다.

이후 며칠간 다양한 시행착오를 거쳤고, 결국에는 CSS `grid` 속성을 활용하여, 검출된 레이아웃과 일치하도록 태그를 동적으로 생성하는 방법을 생각해낼 수 있었습니다. 먼저 이미지의 너비, 높이에 선분 데이터의 좌표를 대입하여 나눠진 각 구획들이 전체 너비, 높이에서 차지하는 비율을 구했고, 이를 `grid` 레이아웃에서 트랙 사이즈를 정하는데 사용하는 `fr` 단위를 가진 문자열로 변환하였습니다. 이후 각 레이아웃 구획에 대한 `<div>` 태그들 전체를 감싸는 부모 태그를 추가한 뒤 위에서 생성한 문자열을 각 `grid-template-rows`, `grid-template-columns`속성의 값으로 부여하여 기본적인 레이아웃 형태를 잡을 수 있었습니다.

하지만 이 방법은 레이아웃이 가로, 또는 세로 중 한 종류의 선분만 있을 때 적용 가능했고, 복합적인 레이아웃의 경우엔 추가적으로 자식태그들에게도 동적으로 관련 속성이 부여되어야 했습니다. 몇 차례 속성 부여 로직을 작성해본 결과 단일 로직에서 모든 경우의 수에 대응하며 속성을 동적으로 부여하는 것은 그때그때 필요한 좌표값의 종류가 다르기에 어렵다고 판단이 되었고, 대안으로 사전에 레이아웃 타입을 지정한 뒤 각 타입에 해당하는 레이아웃이 인식되었을 경우 이에 맞는 로직이 실행되도록 변경하였습니다. 레이아웃 타입은 일반적으로 많이 사용되는 경우를 고려해 다음과 같이 분류하였습니다.

- 가로 선분만 있는 경우(ex: `header, main, footer`)
- 세로 선분만 있는 경우(ex: `side, main`)
- 가로 세로가 섞여있으나, 화면을 가로지르는 선분이 가로 선분인 경우(주로 holy grail 레이아웃과 같은 형태)

비록 제한적이긴 하나, 이 과정을 통해서 기초적인 수준의 레이아웃 형태에 대해서는 동적으로 코드를 생성해낼 수 있게 되었습니다. 이후에는 미리보기로 렌더링된 코드의 부모 엘리먼트를 `useRef`로 불러온 뒤, 해당 엘리먼트의 자식 태그들을 문자열로 변환하여 최종적으로 사용자에게 표시해 줄 수 있었습니다.

### 4. 더욱 발전하려면 어떻게 해야될까?

근본적으로 본 프로젝트는 "각 레이아웃 영역이 선이나 색상으로 명확히 구분되는" 이미지에 한해서 레이아웃 검출이 가능하다는 한계를 지니고 있습니다. 이는 edge detection 과정에서 주변과 색이 다른 픽셀들을 선별하여 테두리로 검출할 후보군을 계산하기 때문입니다. 테두리 없이 콘텐츠가 배치된 영역만을 기준으로 레이아웃을 검출해내려면 object detection 또는 symantic segmentation 등의 머신러닝이 적용된 기술을 사용하여 이미지에 존재하는 각 요소들을 구분할 수 있어야 할 것으로 판단이 됩니다. 사실 이번에는 여건상 적용하지는 못했으나, 프로젝트 기획 과정에서 머신러닝 분야에 대하여 많은 흥미로움을 느꼈고, 추후 가능하다면 더 깊게 공부한 뒤 본 프로젝트에도 해당 기술을 추가로 적용해보고 싶은 마음이 큽니다.

위와 더불어, 현재의 로직을 기준으로 코드를 추출해낼 수 있는 레이아웃의 형태가 한정적이라는 점도 아쉬움으로 남습니다. 단편적으로는 레이아웃 타입의 경우의 수를 늘리고 이에 해당하는 로직을 추가함으로써 보완할 수 있으나, 한정된 프로젝트 기한 내에서 더 이상 보완작업에 시간을 분배할 수 없었기에 더욱 아쉬움이 큽니다. 허나 이러한 방식은 다양한 레이아웃을 추출하려함에 비례하여 로직이 계속해서 비대해질 것이기 때문에, 근본적인 해결책은 아니기도 합니다. 이에 추출 과정을 일관된 하나의 함수로 해결할 수 있도록 더 고민하고 보완을 시도해볼 예정입니다.

<br/>

## 📝 Dev Log

### Weekly work ([22/11/07 ~ 22/11/27](https://cute-moose-81f.notion.site/eb17d1f5df694b30a1ce9a7663d4e74e?v=4e7d3689d5354bf8a33752e5a7d4b8cb))

<details>
  <summary>Week 01 - 기획 및 기술검증</summary>

  - 아이디어 조사
  - 기술 검증 및 구현 방향 고민
  - 목업(figma) 및 구체적인 계획 수립(canvan 작성)

</details>

<details>
  <summary>Week 02 - 기능 개발</summary>

  - 프로젝트 초기 세팅(Git repo, lint 설정 등)
  - 정적 페이지 구현
  - 이미지 사전처리 로직 구현
  - 이미지로부터 직선 선분을 검출하는 로직 구현

</details>

<details>
  <summary>Week 03 - 기능 개발 및 마무리 작업</summary>

  - 검출된 선분으로 레이아웃을 구현하는 로직 작성
  - 엣지 케이스 확인에 따른 지속적인 로직 보완 작업
  - 전반적인 리팩토링, 코드 스타일 점검
  - 배포 이슈 해결(webpack config override)
  - 리드미 작성

</details>

<br/>

### What I realized & learned

#### _`“dependencies”: “other-peoples-work”`_

이번 프로젝트를 진행하면서 정말 많은 것들을 느끼고 배웠지만, 그 중에서도 가장 뼈저리게 느낀점은 “내가 그동안 얼마나 다른 사람들의 작업물에 의존해왔나”라는 부분이었습니다.

돌이켜 생각해보니 실제로 코드를 작성하며 구현해나갔던 시간들 보다, 초기 기획과 기술검증 작업을 진행한 첫 번째 주가 저에게는 가장 힘들고 고통스러운 시간이었습니다. 내가 계획하고 고민하고 있는 방향이 맞는지, 실제로 정말 구현이 가능할 지 확신하기 어려웠을 뿐더러, "모달 만드는 방법"이나 "좋은 디렉토리 구조 짜는 방법"과는 달리 "이미지에서 레이아웃을 검출해 코드화 하는 방법"에 대해서는 속시원한 관련자료나 예시, 레퍼런스로 삼을 작업물을 도통 발견할 수가 없었고, 그야말로 망망대해에 홀로 남겨진 기분을 느낄 뿐이었습니다. 동시에, 아무리 공부 중인 입장이라지만 이렇게까지 다른 사람들의 작업물에 의존적이라면 "내가 개발자로써 혼자 할 수 있는 일이 있긴 있을까?" 라는 도움 안되는 걱정과 여러 고민들로 밤을 지새우기도 하였습니다.

#### _`천 리 길도 한 걸음부터`_

이러한 상황 속에서 한 가지 번뜩 떠오른 조언이 있었습니다. 바로 "막연하고 감이 잡히지 않을때는 우선 요구되는 사항을 잘게 나누고, 가장 작은 부분부터 차근차근 구현해나가라"는 [켄님](https://github.com/Ken123777)의 조언이었습니다. 자료 조사와 기술 검증에 그렇게 몰두했으면서도 첫 주가 다 지나갈 무렵까지 명확한 계획을 수립하지 못했었는데, 이는 막연한 두려움에 닥치는대로 관련자료나 레퍼런스 작업물을 찾아 헤멘 것이었을 뿐 지금 눈앞에 있는 문제 해결을 위해 "정말, 제대로 된" 노력을 한 것은 아니었구나라는 것을 그때서야 깨닫게 되었습니다.

이후 저는 상황을 조금 더 차분하게 바라볼 수 있었고, 이 프로젝트를 구현하는데 필요한 기술이 무엇인지 작은 단위부터 다시 고민하기 시작했습니다. "근본적으로 이미지에서 무언가 검출하려면 일단 픽셀 데이터를 다룰 수 있어야겠네.", "픽셀을 조작할 수 있다면 이미지를 가로지르는 직선들만 로직으로 골라서 추출할 수 있지 않을까?", "다른 부분들은 제외하고 선분만 인식하려면 이미지에서 테두리만 부각시키는 전처리가 필요하겠다!" ... .

이러한 과정들을 거쳐서 다시금 구체적인 계획을 세웠고, 작업이 시작된 이후로는 계획에 맞추어 하루하루 그저 충실히 구현시켜 나갔습니다. 작업을 진행할 수록 처음에는 예상하지 못했던 다양한 이슈들이 빗발쳐 나오며 마음을 꺾으려 들었지만, 기획 단계에서의 고민들을 떠올리며 문제의 요지를 파악하고 해결할 근거를 마련하는데 집중하고자 노력했습니다. 그 결과, 비록 많이 부족하지만 그래도 계획했던 동작을 어느정도 수행하는 결과물을 만들어 낼 수 있었습니다.

#### _`공격수이기 전에, 축구선수다`_

프로젝트를 마무리하는 시점에서, 불현듯 이 생각이 뇌리에 박혔습니다.

> "프론트엔드 개발자이기 전에, 나는 먼저 '___개발자___ '가 되어야 하는 것이구나."

아무리 슛을 잘하고 드리블 능력이 뛰어나더라도 축구 선수로써의 기초 체력이나 피지컬, 축구 지능이 형편없다면 훌륭한 선수가 되기는 어려울 것입니다. 개발자도 마찬가지로, 아무리 내가 최신 기능을 자랑하는 라이브러리를 능수능란히 다루며 트렌드를 잘 따라가더라도, 근본적으로 "눈앞의 문제를 논리적으로 살피고 기술적으로 스스로 해결해내는 능력"이 없다면, 그것은 10분도 못 뛰고 탈진해버리는 축구선수와 다를바 없을 것입니다. 

허나 부끄럽게도, 이는 처음 떠올린 생각이 아니라 부트캠프를 진행하면서 항상 들어왔던 조언입니다. 지금까지는 머리로만 이해했고 구체적으로 느껴진 적이 없었는데, 실제로 그 상황을 겪고 나서야 사무치게 깨닫는 제 자신을 보며 많은 반성과 성찰도 하였습니다. 또한 문제를 해결해나감에 있어 다른 작업물에 지나치게 의존하지 말고, 그 작업물들이 만들어진 과정이나 사고방식을 통해 배운 후 스스로 적용해보는 시도를 필히 먼저 수행해야겠다고 다짐하는 계기가 되었습니다.

우왕좌왕 방황하고 괜히 선택했다며 초반에는 후회도 막심했던 프로젝트이지만, 결과적으로는 뜻깊은 경험들이 정말 많았고, 지난 3주간 느꼈던 이 감정과 고민들을 잘 정돈하여 기본에 충실한 개발자가 되어야겠다고 마음이 다잡아지는 여정이었기 때문에 감사한 마음이 큽니다. 비록 완성도가 뛰어나진 않지만 그 과정에서 많은 배움과 깨달음이 있었던, 참으로 고마운 프로젝트가 되었다는 생각입니다. 이를 발판삼아 ___"진짜 개발자"___ 가 되기 위해 성장해 나가도록 해야겠습니다. 🔥

<br/>

## 💻 More Description

<details>
  <summary>Libraries & tools used</summary>

  - React
  - React-router
  - Recoil
  - OpenCv
  - Styled-components
  - React-app-rewired

</details>

<details>
  <summary>How to run it locally</summary>
  
  아래와 같은 순서로 프로젝트를 클론 받은 후 실행할 수 있습니다.

  ```

  git clone <https://github.com/rktnsinger/layout-generator-client.git>

  npm install

  npm start

  ```

</details>

## Author

- An Hyungwoo(안 형우)
- rktnsinger@gmail.com
