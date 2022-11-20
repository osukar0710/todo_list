# 機能
todo_list

# 実装内容
- webstrageによるデータ保存機能
- 非同期によるコメント追加・削除機能
- 入力欄あやまりチェック機能
- jQueryライブラリーでのカレンダー機能

# スキル
- HTML
- CSS/bootstrap(一部)
- javascript/jQuery

# 使い方
#### 【TODO登録】
1. タスク欄に内容入力
2. 期限欄クリックするとカレンダーがでるので選択
3. 追加

#### 【編集】
1. 内容欄の下に編集ボタンクリック
2. タスク欄と編集欄入力し登録ボタンクリック

#### 【削除】
1. 完了ボタンクリック（一度消すと戻せません）

#保存機能について
データベースを使用してないので保存はブラウザのWebStorage機能で実装
DOMロード時にWebStorage有無確認しデータをロードするようにすることで反映しました。
編集削除機能でWebStorageへ反映させる。

# URL
https://osukar0710.github.io/todo_list/
