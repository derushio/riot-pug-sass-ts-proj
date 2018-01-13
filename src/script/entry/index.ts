import Vue from "vue";

Vue.component("list-item", {
  props: ["item"],
  template: "<li>{{ item.name }}</li>",
});
Vue.component("weapon", {
  props: ["item"],
  template: "<li>{{ item.name }}<br><small class='pl-3'><small class='text-success'>{{ item.subWeapon }}</small>" +
    " <small class='text-danger'>{{ item.special }}</small></small></li>",
});

const app = new Vue({
  computed: {
    seenCategories() { return this.selection === "category"; },
    seenSubWeapons() { return this.selection === "subWeapon"; },
    seenSpecials() { return this.selection === "special"; },
  },
  data: {
    categories: [
      { id: 1, name: "シューター" },
      { id: 2, name: "チャージャー" },
      { id: 3, name: "ブラスター" },
      { id: 4, name: "ローラー" },
      { id: 5, name: "フデ" },
      { id: 6, name: "スロッシャー" },
      { id: 7, name: "スピナー" },
      { id: 8, name: "マニューバー" },
      { id: 9, name: "シェルター" },
    ],
    selectedCategory: 1,
    selectedSpecial: 3,
    selectedSubWeapon: 1,
    selectedWeapons: [3],
    selection: "weapon",
    specials: [
      { id: 1, name: "アメフラシ" },
      { id: 2, name: "イカスフィア" },
      { id: 3, name: "インクアーマー" },
      { id: 4, name: "カーリングボムピッチャー" },
      { id: 5, name: "キューバンボムピッチャー" },
      { id: 6, name: "ジェットパック" },
      { id: 7, name: "スーパーチャクチ" },
      { id: 8, name: "スプラッシュボムピッチャー" },
      { id: 9, name: "ハイパープレッサー" },
      { id: 10, name: "ハイパープレッサー" },
      { id: 11, name: "バブルランチャー" },
      { id: 12, name: "マルチミサイル" },
    ],
    subWeapons: [
      { id: 1, name: "スプラッシュボム" },
      { id: 2, name: "クイックボム" },
      { id: 3, name: "キューバンボム" },
      { id: 4, name: "スプリンクラー" },
      { id: 5, name: "ジャンプビーコン" },
      { id: 6, name: "スプラッシュシールド" },
      { id: 7, name: "ポイントセンサー" },
      { id: 8, name: "トラップ" },
      { id: 9, name: "カーリングボム" },
      { id: 10, name: "ロボットボム" },
      { id: 11, name: "ポイズンミスト" },
    ],
    weapons: [
      { id: 1, category: "シューター", name: "スプラシューターコラボ", subWeapon: "スプラッシュボム", special: "ジェットパック" },
      { id: 2, category: "シューター", name: ".52ガロン", subWeapon: "ポイントセンサー", special: "イカスフィア" },
      { id: 3, category: "シューター", name: "わかばシューター", subWeapon: "スプラッシュボム", special: "インクアーマー" },
      { id: 4, category: "シューター", name: "シャープマーカー", subWeapon: "ポイズンミスト", special: "ジェットパック" },
      { id: 5, category: "シューター", name: "N-ZAP89(赤ZAP)", subWeapon: "ロボットボム", special: "マルチミサイル" },
      { id: 6, category: "シューター", name: "N-ZAP85(黒ZAP)", subWeapon: "キューバンボム", special: "インクアーマー" },
      { id: 7, category: "シューター", name: "プライムシューター", subWeapon: "ポイントセンサー", special: "アメフラシ" },
      { id: 8, category: "シューター", name: "ボールドマーカー", subWeapon: "カーリングボム", special: "スーパーチャクチ" },
      { id: 9, category: "シューター", name: "プロモデラーRG(金モデ)", subWeapon: "スプリンクラー", special: "イカスフィア" },
      { id: 10, category: "シューター", name: "スプラシューター", subWeapon: "クイックボム", special: "スーパーチャクチ" },
      { id: 11, category: "シューター", name: "L3リールガンD", subWeapon: "クイックボム", special: "ジェットパック" },
      { id: 12, category: "シューター", name: "ジェットスイーパーカスタム", subWeapon: "クイックボム", special: "ハイパープレッサー" },
      { id: 13, category: "シューター", name: "プライムシューターコラボ", subWeapon: "キューバンボム", special: "バブルランチャー" },
      { id: 14, category: "シューター", name: "もみじシューター", subWeapon: "ロボットボム", special: "アメフラシ" },
      { id: 15, category: "シューター", name: "プロモデラーMG(銀モデ)", subWeapon: "キューバンボム", special: "カーリングボムピッチャー" },
      { id: 16, category: "シューター", name: ".96ガロン", subWeapon: "スプリンクラー", special: "インクアーマー" },
      { id: 17, category: "シューター", name: "L3リールガン", subWeapon: "カーリングボム", special: "イカスフィア" },
      { id: 18, category: "シューター", name: "ジェットスイーパー", subWeapon: "ポイズンミスト", special: "マルチミサイル" },
      { id: 19, category: "シューター", name: "H3リールガン", subWeapon: "ポイントセンサー", special: "マルチミサイル" },
      { id: 20, category: "シューター", name: "ボトルガイザー", subWeapon: "スプラッシュシールド", special: "ハイパープレッサー" },
      { id: 21, category: "マニューバー", name: "デュアルスイーパー", subWeapon: "ポイントセンサー", special: "マルチミサイル" },
      { id: 22, category: "マニューバー", name: "スプラマニューバー", subWeapon: "クイックボム", special: "マルチミサイル" },
      { id: 23, category: "マニューバー", name: "スプラマニューバーコラボ", subWeapon: "カーリングボム", special: "ジェットパック" },
      { id: 24, category: "マニューバー", name: "スパッタリー", subWeapon: "ビーコン", special: "キューバンボムピッチャー" },
      { id: 25, category: "マニューバー", name: "ケルビン525", subWeapon: "トラップ", special: "ジェットパック" },
      { id: 26, category: "チャージャー", name: "スプラスコープ", subWeapon: "スプラッシュボム", special: "ハイパープレッサー" },
      { id: 27, category: "チャージャー", name: "スクイックリンα", subWeapon: "ポイントセンサー", special: "インクアーマー" },
      { id: 28, category: "チャージャー", name: "スプラチャージャー", subWeapon: "スプラッシュボム", special: "ハイパープレッサー" },
      { id: 29, category: "チャージャー", name: "14式竹筒銃・甲", subWeapon: "カーリングボム", special: "マルチミサイル" },
      { id: 30, category: "チャージャー", name: "ソイチューバー", subWeapon: "キューバンボム", special: "スーパーチャクチ" },
      { id: 31, category: "チャージャー", name: "スプラチャージャーコラボ", subWeapon: "スプラッシュシールド", special: "キューバンボムピッチャー" },
      { id: 32, category: "チャージャー", name: "スプラスコープコラボ", subWeapon: "スプラッシュシールド", special: "キューバンボムピッチャー" },
      { id: 33, category: "チャージャー", name: "リッター4K", subWeapon: "トラップ", special: "アメフラシ" },
      { id: 34, category: "チャージャー", name: "4Kスコープ", subWeapon: "トラップ", special: "アメフラシ" },
      { id: 35, category: "チャージャー", name: "リッター4Kカスタム", subWeapon: "ビーコン", special: "バブルランチャー" },
      { id: 36, category: "チャージャー", name: "4Kスコープカスタム", subWeapon: "ビーコン", special: "バブルランチャー" },
      { id: 37, category: "ブラスター", name: "ホットブラスターカスタム", subWeapon: "ロボットボム", special: "ジェットパック" },
      { id: 38, category: "ブラスター", name: "ノヴァブラスター", subWeapon: "スプラッシュボム", special: "イカスフィア" },
      { id: 39, category: "ブラスター", name: "ラピッドブラスター", subWeapon: "トラップ", special: "スプラッシュボムピッチャー" },
      { id: 40, category: "ブラスター", name: "ホットブラスター", subWeapon: "ポイズンミスト", special: "スーパーチャクチ" },
      { id: 41, category: "ブラスター", name: "Rブラスターエリート", subWeapon: "ポイズンミスト", special: "アメフラシ" },
      { id: 42, category: "ブラスター", name: "ロングブラスター", subWeapon: "キューバンボム", special: "アメフラシ" },
      { id: 43, category: "ブラスター", name: "クラッシュブラスター", subWeapon: "スプラッシュボム", special: "ハイパープレッサー" },
      { id: 44, category: "ローラー", name: "ダイナモローラー", subWeapon: "トラップ", special: "ハイパープレッサー" },
      { id: 45, category: "ローラー", name: "スプラローラーコラボ", subWeapon: "ビーコン", special: "イカスフィア" },
      { id: 46, category: "ローラー", name: "カーボンローラー", subWeapon: "ロボットボム", special: "アメフラシ" },
      { id: 47, category: "ローラー", name: "ダイナモローラーテスラ", subWeapon: "スプラッシュボム", special: "インクアーマー" },
      { id: 48, category: "ローラー", name: "スプラローラー", subWeapon: "カーリングボム", special: "スーパーチャクチ" },
      { id: 49, category: "ローラー", name: "ヴァリアブルローラー", subWeapon: "スプラッシュシールド", special: "スプラッシュボムピッチャー" },
      { id: 50, category: "ローラー", name: "ヴァリアブルローラーフォイル", subWeapon: "キューバンボム", special: "マルチミサイル" },
      { id: 51, category: "フデ", name: "ホクサイ", subWeapon: "ロボットボム", special: "ジェットパック" },
      { id: 52, category: "フデ", name: "パブロ", subWeapon: "スプラッシュボム", special: "スーパーチャクチ" },
      { id: 53, category: "フデ", name: "ホクサイ・ヒュー", subWeapon: "ビーコン", special: "マルチミサイル" },
      { id: 54, category: "フデ", name: "パブロ・ヒュー", subWeapon: "トラップ", special: "イカスフィア" },
      { id: 55, category: "スロッシャー", name: "バケットスロッシャー", subWeapon: "キューバンボム", special: "マルチミサイル" },
      { id: 56, category: "スロッシャー", name: "ヒッセン", subWeapon: "クイックボム", special: "インクアーマー" },
      { id: 57, category: "スロッシャー", name: "スクリュースロッシャー", subWeapon: "ロボットボム", special: "ハイパープレッサー" },
      { id: 58, category: "スロッシャー", name: "バケットスロッシャーデコ", subWeapon: "スプリンクラー", special: "イカスフィア" },
      { id: 59, category: "スピナー", name: "バレルスピナーデコ", subWeapon: "スプラッシュシールド", special: "バブルランチャー" },
      { id: 60, category: "スピナー", name: "バレルスピナー", subWeapon: "スプリンクラー", special: "ハイパープレッサー" },
      { id: 61, category: "スピナー", name: "スプラスピナー", subWeapon: "クイックボム", special: "マルチミサイル" },
      { id: 62, category: "シェルター", name: "パラシェルター", subWeapon: "スプリンクラー", special: "アメフラシ" },
      { id: 63, category: "シェルター", name: "キャンピングシェルター", subWeapon: "ビーコン", special: "バブルランチャー" },
      { id: 64, category: "シェルター", name: "スパイガジェット", subWeapon: "トラップ", special: "スーパーチャクチ" },
      { id: 65, category: "スピナー", name: "ハイドラント", subWeapon: "ロボットボム", special: "スーパーチャクチ" },
      { id: 66, category: "マニューバー", name: "スパッタリー・ヒュー", subWeapon: "ポイズンミスト", special: "アメフラシ" },
    ],
  },
  el: "#app",
  methods: {
    randomize() {
      switch (this.selection) {
        case "weapon":
          this.selectedWeapons = [1 + Math.floor(Math.random() * this.weapons.length)];
          break;
        case "category":
          this.selectedCategory = 1 + Math.floor(Math.random() * this.categories.length);
          this.selectedWeapons = this.weapons
              .filter((e) => e.category === this.categories[this.selectedCategory - 1].name)
              .map((e) => e.id);
          break;
        case "subWeapon":
          this.selectedSubWeapon = 1 + Math.floor(Math.random() * this.subWeapons.length);
          this.selectedWeapons = this.weapons
              .filter((e) => e.subWeapon === this.subWeapons[this.selectedSubWeapon - 1].name)
              .map((e) => e.id);
          break;
        case "special":
          this.selectedSpecial = 1 + Math.floor(Math.random() * this.specials.length);
          this.selectedWeapons = this.weapons
              .filter((e) => e.special === this.specials[this.selectedSpecial - 1].name)
              .map((e) => e.id);
          break;
      }
    },
  },
});
