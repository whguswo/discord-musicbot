# discord-musicbot
discord.js v14로 만든 디스코드 음악봇입니다.  

유튜브 검색 API를 사용하여 검색을 진행합니다.  

discord.js v14로 업그레이드와 `queue` 구현을 완료했습니다.  



## 설치 & 실행

> npm i  
>
> create .env file
>
> nodemon



**.env**

```.env
DISCORD_TOKEN=(Discord Bot Token)
CLIENT_ID=(Discord Bot ClientId)
GUILD_ID=(Your GuildId)
YOUTUBE_API=(Youtube API Key)
```



## 사용법

#### /help

> 사용 가능한 명령어들을 출력합니다.

#### /play

>  `Youtube Data API v3`을 사용하여 키워드를 검색한후 가장 첫번째로 나오는 영상을 재생합니다.  
>
> `queue`가 없는경우 자동으로 생성하고 다른음악이 재생중이라면 `queue`에 넣습니다.

#### /skip

> 재생중인 음악을 건너뛰기 합니다.  
>
> `queue`에서 가장 첫번째(재생중인 음악)를 없애고 다음 음악을 재생합니다.

#### /stop

> 음악재생을 중지하고 해당 서버에 대한 `queue`를 삭제합니다.  
>
> `queue`는 play 명령어 입력시 다시 생성됩니다.

#### /q

> 지금 재생중인 음악의 정보를 담은 `Embed`를 출력합니다.

#### /pause

> 음악재생을 일시중지합니다.

#### /unpause

> 일시중지를 해제합니다.

