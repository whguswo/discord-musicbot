# discord-musicbot
discord.js로 만든 디스코드 음악봇입니다.  

유튜브 검색 API를 사용하여 검색을 진행합니다.  



## 설치 & 실행

> npm i  
>
> config.json 생성  
>
> nodemon

**config.json**

```json
{
    "token": "Discord Bot Token",
    "youtube_key": "Youtube API Key",
    "guildId": "Your guildID",
    "clientId": "Your botID"
}
```



## 사용법

#### help, 도움말

> /help
>
> /도움말

`slash command`입니다. 디스코드에서 /를 입력한 후 사용합니다.  

봇의 도움말을 출력합니다.  

#### 음악 재생  

> -p (검색어 or URL)
>
> /p (검색어 or URL, slash command)

검색은 `Youtube Data API v3`을 사용하였습니다.  

유튜브에 해당 키워드를 검색한후 가장 첫번째로 나오는 영상을 재생합니다.  

#### 서버정보

> /server

`slash command`입니다. 디스코드에서 /를 입력한 후 사용합니다.  

서버에 총 인원과 총 챗봇 수를 출력합니다.  

#### 유저정보

> /user

`slash command`입니다. 디스코드에서 /를 입력한 후 사용합니다.  

유저의 태그와 아이디를 출력합니다.  
