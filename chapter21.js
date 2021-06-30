console.log('Chapter 21. Excercises');  // Skipped all exercises

//#region Chapter 21.1 Хранение на диске
// Сервер обмена опытом хранит данные исключительно в памяти. 
// Это означает, что в случае сбоя или перезапуска по любой 
// причине все разговоры и комментарии будут потеряны. 

// Дополните сервер так, чтобы он сохранял информацию о беседе на диск
// и автоматически перезагружал ее при перезапуске. Не беспокойтесь об
// эффективности - сделайте самое простое, лишь бы работало. 
console.log('=== Chapter 21.1 Хранение на диске');
// This isn't a stand-alone file, only a redefinition of a few
// fragments from skillsharing/skillsharing_server.js
const {readFileSync, writeFile} = require("fs");
const fileName = "./talks.json";

function loadTalks() {
  let json;
  try {
    json = JSON.parse(readFileSync(fileName, "utf8"));
  } catch (e) {
    json = {};
  }
  return Object.assign(Object.create(null), json);
}

SkillShareServer.prototype.updated = function() {
  this.version++;
  let response = this.talkResponse();
  this.waiting.forEach(resolve => resolve(response));
  this.waiting = [];
  writeFile(fileName, JSON.stringify(this.talks), e => {
    if (e) throw e;
  });
};

// The line that starts the server must be changed to
new SkillShareServer(loadTalks()).start(8000);
//#endregion

//#region Chapter 21.2 Сброс поля комментариев 
// Полная повторная визуализация всех бесед работает довольно хорошо,
// потому что мы, как правило, не можем определить разницу между DОМ узлом 
// и его идентичной заменой. Но бывают исключения. Если начать чтото вводить 
// в поле комментария для беседы в одном окне браузера, а затем
// в другом добавить комментарий к этой беседе, то поле в первом окне будет
// визуализировано заново, так что пропадет и его содержимое, и фокус.

// Во время жаркой дискуссии, когда несколько человек добавляют комментарии 
// одновременно, это будет раздражать. Можете ли вы придумать способ
// решить такую проблему? 
console.log('=== Chapter 21.2 Сброс поля комментариев ');
// This isn't a stand-alone file, only a redefinition of the main
// component from skillsharing/public/skillsharing_client.js

class Talk {
  constructor(talk, dispatch) {
    this.comments = elt("div");
    this.dom = elt(
      "section", {className: "talk"},
      elt("h2", null, talk.title, " ", elt("button", {
        type: "button",
        onclick: () => dispatch({type: "deleteTalk",
                                 talk: talk.title})
      }, "Delete")),
      elt("div", null, "by ",
          elt("strong", null, talk.presenter)),
      elt("p", null, talk.summary),
      this.comments,
      elt("form", {
        onsubmit(event) {
          event.preventDefault();
          let form = event.target;
          dispatch({type: "newComment",
                    talk: talk.title,
                    message: form.elements.comment.value});
          form.reset();
        }
      }, elt("input", {type: "text", name: "comment"}), " ",
          elt("button", {type: "submit"}, "Add comment")));
    this.syncState(talk);
  }

  syncState(talk) {
    this.talk = talk;
    this.comments.textContent = "";
    for (let comment of talk.comments) {
      this.comments.appendChild(renderComment(comment));
    }
  }
}

class SkillShareApp {
  constructor(state, dispatch) {
    this.dispatch = dispatch;
    this.talkDOM = elt("div", {className: "talks"});
    this.talkMap = Object.create(null);
    this.dom = elt("div", null,
                   renderUserField(state.user, dispatch),
                   this.talkDOM,
                   renderTalkForm(dispatch));
    this.syncState(state);
  }

  syncState(state) {
    if (state.talks == this.talks) return;
    this.talks = state.talks;

    for (let talk of state.talks) {
      let cmp = this.talkMap[talk.title];
      if (cmp && cmp.talk.presenter == talk.presenter &&
          cmp.talk.summary == talk.summary) {
        cmp.syncState(talk);
      } else {
        if (cmp) cmp.dom.remove();
        cmp = new Talk(talk, this.dispatch);
        this.talkMap[talk.title] = cmp;
        this.talkDOM.appendChild(cmp.dom);
      }
    }
    for (let title of Object.keys(this.talkMap)) {
      if (!state.talks.some(talk => talk.title == title)) {
        this.talkMap[title].dom.remove();
        delete this.talkMap[title];
      }
    }
  }
}
//#endregion