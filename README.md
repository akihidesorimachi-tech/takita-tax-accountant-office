# 瀧田潤税理士事務所サイト — Claude Code 移管パッケージ

このパッケージには、現在の公開サイトを Claude Code で保守・改修するための **React / Vite ソースコード、全画像アセット、依存関係のロックファイル** を収録しています。Manus の公開用CDNに依存しないよう、画像はすべて `client/public/assets/` に同梱し、アプリケーション内の参照先もローカルパスへ変更済みです。

**公開URL:** https://akihidesorimachi-tech.github.io/takita-tax-accountant-office/

## 起動方法

Node.js 22 以降と pnpm を用意したうえで、このフォルダを Claude Code で開いてください。ターミナルでは以下を実行します。

```bash
pnpm install --frozen-lockfile
pnpm dev
```

開発サーバー起動後、表示されるローカルURLをブラウザで開くと確認できます。公開用ビルドは次のコマンドです。

```bash
pnpm check
pnpm build
pnpm start
```

## 構成

| パス | 用途 |
|---|---|
| `client/src/pages/Home.tsx` | トップページの主要コンテンツ・レイアウト |
| `client/src/index.css` | 全体のカラー、タイポグラフィ、共通スタイル |
| `client/src/App.tsx` | ページルーティングとアプリケーションの入口 |
| `client/public/assets/` | ヒーロー、サービス、瀧田先生本人の写真 |
| `client/index.html` | ページタイトル、フォント読み込み、メタ情報 |
| `package.json` / `pnpm-lock.yaml` | 依存パッケージと固定バージョン |
| `.github/workflows/deploy.yml` | GitHub Pages への自動デプロイ |

## 画像アセット

| ファイル | 使用箇所 | 備考 |
|---|---|---|
| `takita-portrait.webp` | ヒーロー、経歴 | ユーザー提供の瀧田潤税理士本人写真。AI生成画像に置き換えないこと。 |
| `hero-bg.jpg` | ヒーロー背景 | 事務所のイメージ背景 |
| `service-inheritance.jpg` | 相続・事業承継 | サービスカード用 |
| `service-corporate.jpg` | 法人税務顧問 | サービスカード用 |
| `service-tax.jpg` | 個人確定申告 | サービスカード用 |
| `service-doctor.jpg` | 医業支援 | サービスカード用 |

## 運用上の注意

瀧田先生の写真は `client/public/assets/takita-portrait.webp` です。写真を差し替える場合を除き、画像の人物・顔・トリミングをAIで変更しないでください。現在のヒーローセクションには、ユーザーの指示により「お問い合わせはこちら」と「経歴を見る」のボタンは配置していません。

お問い合わせ先は `03-6456-3995`、メールアドレスは `takita@trust-ac.co.jp` です。文言や連絡先を更新する際は、`Home.tsx` 内の全表示箇所を確認してください。

## Claude Code への依頼例

> `client/src/pages/Home.tsx` のみを編集して、サービスカードの本文を更新してください。`client/public/assets/takita-portrait.webp` の人物写真は変更しないでください。変更後に `pnpm build` を実行して結果を報告してください。

> スマホ表示を修正する場合は、デスクトップ表示を変更しないこと。最初に現在のDOM構造を確認し、変更範囲を最小限にしてください。

## 公開(GitHub Pages)

`main` ブランチへの push で `.github/workflows/deploy.yml` が自動的に `pnpm build` を実行し、GitHub Pages（プロジェクトページ `/takita-tax-accountant-office/` 配下）に公開します。ベースパスは `VITE_BASE_PATH` 環境変数(`vite.config.ts`)で切り替えており、画像パスやルーティングも `import.meta.env.BASE_URL` を基準に組み立てています。初回のみ、リポジトリの Settings → Pages → Build and deployment → Source を「GitHub Actions」に設定してください。

Cloudflare Pages、Vercel、Netlify、レンタルサーバー等への公開も、一般的なViteプロジェクトとして構成されているため可能です。Manus 上の現行公開サイトは、本パッケージの動作確認後に別途切り替えてください。
