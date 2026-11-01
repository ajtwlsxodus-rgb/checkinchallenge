# Walkonnect Check-In Rewards Challenge

직원이 사번을 입력하면 본인의 걷기 챌린지 결과를 볼 수 있는 한 페이지짜리 사이트입니다.

---

## 📁 파일 안내 (어디를 고치면 되나요?)

| 파일 | 내용 |
|---|---|
| `config.js` | ⭐ **설정 모음 파일.** 색상, 글꼴, 글자 크기, 화면 문구, DB 테이블·컬럼 이름이 모두 여기 있어요. 대부분의 수정은 이 파일만 고치면 됩니다. |
| `lib/sampleData.js` | Supabase 연결 전 화면 확인용 샘플 데이터 (12345, AB123) |
| `app/page.js` | 화면 |
| `app/api/result/route.js` | 서버에서 Supabase를 조회하는 부분 (읽기만 함, 비밀 키는 여기서만 사용) |
| `.env.example` | 필요한 비밀 값의 이름 견본 (실제 값 없음) |

> 비밀 값이 들어가는 `.env.local` 파일은 GitHub에 올라가지 않도록 막혀 있어요.

---

## 🚀 Vercel 배포 방법

### 1단계. Vercel에 가입/로그인
1. https://vercel.com 에 접속합니다.
2. **Continue with GitHub**로 로그인합니다 (GitHub 계정과 연결됩니다).

### 2단계. GitHub 저장소 가져오기 (Import)
1. Vercel 첫 화면에서 **Add New…** → **Project**를 누릅니다.
2. 목록에서 `checkinchallenge` 저장소를 찾아 **Import**를 누릅니다.
   - 목록에 안 보이면 **Adjust GitHub App Permissions**를 눌러 이 저장소 접근을 허용해 주세요.
3. **Framework Preset**이 `Next.js`로 되어 있는지 확인합니다 (자동으로 잡힙니다).

### 3단계. 환경변수(비밀 값) 입력
같은 화면의 **Environment Variables** 부분을 펼쳐 아래 두 개를 입력합니다.

| Key (이름) | Value (값) | 어디서 찾나요? |
|---|---|---|
| `SUPABASE_URL` | `https://xxxx.supabase.co` 형태 | Supabase → 프로젝트 → **Project Settings** → **API** (또는 Data API) → Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | 긴 문자열 | 같은 화면의 **service_role** 키 (또는 새 화면의 **Secret key**) → Reveal 후 복사 |

- 이름은 **대문자, 밑줄까지 정확히** 똑같이 적어야 합니다.
- 값 앞뒤에 공백이나 따옴표가 들어가지 않게 주의하세요.
- 적용 환경은 **Production, Preview, Development 모두** 체크해 두면 편합니다.

### 4단계. Deploy
1. **Deploy** 버튼을 누릅니다.
2. 1~2분 뒤 완료되면 `https://checkinchallenge-xxxx.vercel.app` 같은 주소가 생깁니다. 이 주소를 직원에게 공유하면 됩니다.

### 5단계. (나중에 환경변수를 추가·수정했다면) Redeploy
환경변수는 **바꾼 뒤 다시 배포해야** 적용됩니다.
1. Vercel → 프로젝트 → **Settings** → **Environment Variables**에서 값을 추가/수정합니다.
2. **Deployments** 탭으로 이동합니다.
3. 가장 위(최신) 배포 오른쪽의 **⋯** 버튼 → **Redeploy** → 다시 **Redeploy**를 누릅니다.

> 💡 실제 배포(Production)에서는 샘플 데이터가 **절대 쓰이지 않습니다.** 환경변수가 없으면
> "Something went wrong. Please try again later."가 표시됩니다. 이 메시지가 뜨면 아래 체크리스트를 확인하세요.

---

## 🔍 Supabase 연결 후 조회가 안 될 때 체크리스트

위에서부터 순서대로 확인해 보세요.

**1. 환경변수 이름이 정확한가요?**
- [ ] `SUPABASE_URL` (오타, 소문자, 앞뒤 공백 없음)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` (`SERVICE_KEY`, `SUPABASE_KEY` 등 다른 이름이 아님)
- [ ] `NEXT_PUBLIC_`로 시작하는 이름을 쓰지 않았나요? (그러면 키가 방문자에게 노출될 수 있어요. 쓰지 마세요.)

**2. 값이 올바른가요?**
- [ ] URL이 `https://`로 시작하고 `.supabase.co`로 끝나나요? (끝에 `/rest/v1` 같은 것을 붙이지 않아요)
- [ ] 키를 **service_role (Secret)** 키로 넣었나요? `anon`/`publishable` 키를 넣으면 보안 설정 때문에 결과가 비어서 "No results found..."가 나올 수 있어요.
- [ ] 키를 복사할 때 일부가 잘리지 않았나요?

**3. 다시 배포했나요?**
- [ ] 환경변수를 넣거나 바꾼 뒤 **Redeploy** 했나요? (안 하면 예전 설정 그대로입니다)

**4. 테이블·컬럼 이름이 맞나요?**
- [ ] 테이블 이름이 `walking_results` 인가요?
- [ ] 컬럼 이름이 `employee_id`, `goal`, `achieved_days`, `status`, `prize` 인가요?
- [ ] 이름이 다르다면 `config.js`의 **3. Database names** 부분을 실제 이름에 맞게 고치면 됩니다.
- [ ] 테이블이 `public` 스키마(기본 위치)에 있나요?

**5. 데이터가 올바른가요?**
- [ ] `status` 값이 정확히 `달성` 또는 `미달성`인가요? (다른 글자거나 앞뒤에 공백 외의 글자가 있으면 오류 메시지가 나옵니다)
- [ ] `achieved_days`, `prize`에 빈칸이 없나요?
- [ ] 대소문자만 다른 같은 사번이 2줄 이상 있지 않나요? (예: `AB123`과 `ab123`) → 이 경우 의도적으로 오류 메시지를 보여줍니다.
- [ ] 사번에 숫자·영문자 외의 글자(하이픈 `-`, 공백 등)가 들어 있지 않나요? 이 사이트는 숫자·영문자로만 된 사번을 찾습니다.

**6. 그래도 안 되면 — 오류 기록 보기**
1. Vercel → 프로젝트 → **Logs** 탭을 엽니다.
2. 사이트에서 다시 조회해 봅니다.
3. 빨간 기록에 `Supabase error 401`(키 문제), `404` 또는 `relation ... does not exist`(테이블 이름 문제), `column ... does not exist`(컬럼 이름 문제) 같은 내용이 보이면 해당 항목을 고치세요.

---

## 🧪 샘플 데이터 (Supabase 연결 전 확인용)

환경변수가 없고, 실제 배포(Production)가 아닐 때만 아래 샘플로 동작합니다.

| 사번 | Goal | Days | Status | Reward |
|---|---|---|---|---|
| 12345 | 10,000 steps a day | 20 | 달성 | $50 |
| AB123 | 8,000 steps a day | 12 | 미달성 | $0 |

---

## 💻 (선택) 내 컴퓨터에서 실행해 보기

Node.js가 설치되어 있다면:

```bash
npm install
```

```bash
npm run dev
```

그다음 브라우저에서 http://localhost:3000 을 엽니다.
실제 Supabase로 테스트하려면 `.env.example`을 복사해 `.env.local`을 만들고 값을 채우세요.
