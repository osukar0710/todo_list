$(function() {
  // 初期表示の処理
  
  /*----グローバル変数リスト----*/
  let $modalNum = 0; //テーブル要素リスト番号格納
  let storageArray = [];//ローカルストレージ格納用
  let inputText; //タスクデータ
  let inputLimit;//期限データ
  /***********************************************
   * 関数部品
   ***********************************************/

  // --- タスクデータと期限データ　取得&削除処理 ---
  const setTextLimit = function () {
    inputText = $("#inputText");
    inputLimit = $("#inputLimit");
  }
  const deleteTextLimit = function () {
    inputText = $('#inputText').val('');
    inputLimit = $('#inputLimit').val('');
  } 

  // --- ブラウザロード時のローカルストレージ有無と構築 ---
  $(window).ready(function() {
    storageArray = []; //配列を空にする

    // console.log(testView);
    let getTasks = localStorage.getItem("tasks");//取得
    let getTasks_reJson = JSON.parse(getTasks);//json→javascript
    //ローカルストレージ有無確認処理
    if(getTasks_reJson) {
      storageArray = getTasks_reJson;

      for(i = 0; i < storageArray.length; i++){
        // let task = 'task';
        inputText = storageArray[i].task;
        inputLimit = storageArray[i].limit;
        // console.log(typeof inputText);
        // console.log(typeof inputLimit);
        addTable();
        inputText = '';
        inputLimit = '';
      }
      // console.log(storageArray);
      // localStorage.clear();
    }
  });

  // --- テーブル要素追加 ---
  const addTable = function() {
    $("#todoList").append(
      '<tr class="todo_add_item">' +
      '<th class="title_left">' +
        '<button type="button" id="compBtn" class="comp_btn btn">完了</button>' +
        '<button type="button" id="editBtn" class="edit_btn btn">編集</button>' +
      '</th>' +
      '<td class="modal_task_p">' +
      // $("#inputText").val() +
      inputText +
      "</td>" +
      '<td class="modal_limit_p">' +
      // $("#inputLimit").val() +
      inputLimit +
      "</td></tr>"
    );
  };

  // --- ローカルストレージ 保存 ---
  const saveStorage = function () {
    let keyTask = $('#inputText').val(); //タスクデータ保存
    let idLimit = $('#inputLimit').val();//期限データ保存

    let obj = {
      task: keyTask,
      limit: idLimit
    };
    storageArray.push(obj);// グローバル変数に格納
 
    let setjson = JSON.stringify(storageArray);
    localStorage.setItem("tasks", setjson);
    //リセット
    keyTask = "";
    idLimit = "";
  }

  // --- 編集•完了 画面からローカルストレージ保存 ---
    const tableEdit_saveStorage = function() {
    let trLength = $('.todo_add_item').length; //tr要素分取得
    let setArray = [];
    let setjson;
    // console.log(storageArray);
    for(i = 0; i < trLength; i++){
      let task = $(".todo_add_item")//タスク格納
      .eq(i)
      .children(".modal_task_p")
      .text();
      // console.log(task);
  
      let limit = $(".todo_add_item")//期限格納
      .eq(i)
      .children(".modal_limit_p")
      .text();
      // console.log(limit);
  
      let obj = {
        task: task,
        limit: limit
      };
  
      
      setArray.push(obj);
      obj = {};
      // console.log(setArray);
    }
    
    localStorage.clear();//ローカルストレージ全削除
    // console.log(localStorage);
    setjson = JSON.stringify(setArray);
    localStorage.setItem("tasks", setjson);

    // console.log(setjson);

  };
  
  /***********************************************
   *  追加ボタンを押した時の処理
   ***********************************************/
  $("#addBtn").click(function() {
    //入力チェック
    /*- タスクと期限未入力字 -*/
    if (
      $("#inputText")
        .val()
        .trim().length === 0 &&
      $("#inputLimit")
        .val()
        .trim().length === 0
    ) {
      $("#errorMsg").css("color", "red");
      $("#errorMsg").text("※タスク欄と期限が未入力です");
      return;
    }
    /*- タスク未入力字 -*/
    if (
      $("#inputText")
        .val()
        .trim().length === 0
    ) {
      $("#errorMsg").css("color", "red");
      $("#errorMsg").text("※タスク欄が未入力です");
      return;
    }
    /*- 期限未入力字 -*/
    if (
      $("#inputLimit")
        .val()
        .trim().length === 0
    ) {
      $("#errorMsg").css("color", "red");
      $("#errorMsg").text("※期限が未入力です");
      return;
    }

    //テキスト取得処理
    setTextLimit();

    //ローカルストレージに保存
    if ( inputText && inputLimit ) {
      console.log('ok');
      saveStorage();
 
    //追加処理 改善有り　val()の動作
    $("#todoList").append(
      '<tr class="todo_add_item">' +
      '<th class="title_left">' +
        '<button type="button" id="compBtn" class="comp_btn btn">完了</button>' +
        '<button type="button" id="editBtn" class="edit_btn btn">編集</button>' +
      '</th>' +
      '<td class="modal_task_p">' +
      inputText.val() +
      "</td>" +
      '<td class="modal_limit_p">' +
      inputLimit.val() +
      "</td></tr>"
    );
  }
    //
    $("#errorMsg").css("color", "black");
    $('#errorMsg').text('※タスクと期限を設定し追加を押してください');
    //テキスト削除処理
    deleteTextLimit();
  });
  /***********************************************
   *  Todoリスト　機能
   ***********************************************/
  //完了ボタン削除機能
  $(document).on("click", "#compBtn", function() {
    $(this)
      .closest("tr")
      .remove();
      tableEdit_saveStorage();
  });

  //編集ボタン機能
  $(document).on("click", "#editBtn", function() {
    $("#modalMenu").fadeIn();
    $("#modalOverlay").fadeIn();

    //Todoリストの文字取得
    let $modalTask = $(this)
      .closest("tr")
      .children("td.modal_task_p")
      .text();

    $("#modalTask").attr("value", $modalTask);
    let $modalLimit = $(this)
      .closest("tr")
      .children("td.modal_limit_p")
      .text();
    $("#modalLimit").attr("value", $modalLimit);

    //indexメソッドで何番目のtr要素かを取得
    //テーブル親要素のクラス .todo_add_item
    $modalNum = $("tr.todo_add_item").index($(this).closest("tr"));
  });
  /***********************************************
   *  モーダルウインドウ画面処理
   ***********************************************/
  //  モーダルウインドウ　登録
  $("#modalAdd").click(function() {
    let $modalTask = $("#modalTask").val();
    let $modalLimit = $("#modalLimit").val();

    // let obj = {
    //   task: modalTask,
    //   limit: modalLimit
    // };
    // let setjson = JSON.stringify(obj);
    // localStorage.setItem("tasks", setjson);

    //改善有？　indexメソッド？
    $(".todo_add_item")
      .eq($modalNum)
      .children(".modal_task_p")
      .text($modalTask);
    $(".todo_add_item")
      .eq($modalNum)
      .children(".modal_limit_p")
      .text($modalLimit);  
    $modalNum = 0;

    tableEdit_saveStorage();
    $("#modalMenu").fadeOut();
    $("#modalOverlay").fadeOut();
  });
  
  //モーダルウインドウ 終了
  $("#modalCloseIcon, #modalClose").click(function() {
    $("#modalMenu").fadeOut();
    $("#modalOverlay").fadeOut();

    $modalNum = 0;
    $("#modalMenu").fadeOut();
    $("#modalOverlay").fadeOut();
  });
  /***********************************************
   *  一括削除機能
   ***********************************************/
  $('#bulkDelete').click(function(){
    let isRes = confirm('本当に全部消してもよろしいですか？');
    if(isRes) {
      $('.todo_add_item').remove();
      localStorage.clear();
      storageArray = [];
    }
  });
 
  /***********************************************
   * 期限のカレンダー表示を日本語にする　jQuery UI
   ***********************************************/
  $("#inputLimit, #modalLimit").datepicker({
    language: "ja",
    monthNames: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月"
    ],
    monthNamesShort: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月"
    ],
    dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
    dayNamesMin: ["日", "月", "火", "水", "木", "金", "土"]
  });
});
