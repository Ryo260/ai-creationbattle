import React, { useState, useEffect } from 'react';
import { RefreshCw, Plus, Trash2, Dices, Users, Sparkles, X, Maximize2, ImageOff, RotateCcw } from 'lucide-react';

const CardDealerApp = () => {
  const [commonSituation, setCommonSituation] = useState(null);
  const [playerEvents, setPlayerEvents] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isImageExpanded, setIsImageExpanded] = useState(false); // 画像拡大用の状態
  const [imageError, setImageError] = useState(false); // 画像読み込みエラー用の状態

  // お題データ（拡張版: 3倍増量）
  const situations = [
    // 学校・日常系
    "学校の放課後", "文化祭の前日", "満員電車", "深夜のコンビニ", "就職活動",
    "雨のバス停", "満開の桜並木", "終電後の駅ホーム", "廃校の音楽室", "ビルの屋上",
    "古本屋の奥", "静まり返った水族館", "閉園後の遊園地", "空港の出発ロビー",
    "コインランドリー", "花火大会の河川敷", "クリスマスの街角", "結婚式場",
    "昭和レトロな商店街", "工事現場", "裁判所", "病院の待合室",

    // 旅行・自然系
    "夏の海辺", "田舎の夏休み", "雪山のロッジ", "無人島", "豪華客船",
    "秘湯の温泉旅館", "嵐のキャンプ場", "灼熱のサバンナ", "極寒の南極基地",
    "砂漠のオアシス", "深い森の中", "断崖絶壁",

    // ファンタジー・SF系
    "未来のサイバーパンク都市", "中世ファンタジーの酒場", "ゾンビパニックの世界",
    "宇宙ステーション", "古びた洋館", "夢の中", "タイムマシンの実験室",
    "荒波の海賊船", "からくり忍者屋敷", "深海都市", "天空の城",
    "地下ダンジョン", "王宮の舞踏会", "月面基地", "ロボット工場",
    "荒廃した東京", "AIが支配する世界", "竜の巣", "妖精の森", "お化け屋敷",
    "西部劇の酒場", "脱出不可能な監獄", "怪しいサーカス小屋", "映画の撮影スタジオ",
    "魔法学校の教室", "探偵事務所"
  ];

  const events = [
    // ドラマ・感情系
    "運命の出会い", "大切なものを失くす", "誰にも言えない秘密", "感動の再会",
    "手紙を書く", "嘘がバレる", "突然の告白", "裏切り", "別れの予感",
    "新しい才能の開花", "記憶を取り戻す", "正体がバレる", "プロポーズする",
    "誰かと入れ替わる", "記憶喪失になる", "ライバルが現れる", "相棒ができる",
    "予知夢を見る", "過去の自分に会う", "未来の自分に会う",

    // アクション・トラブル系
    "激しい戦い", "逃走する", "大失敗する", "財布を落とす", "スマホが壊れる",
    "道に迷う", "嵐に遭う", "怪我をする", "濡れ衣を着せられる", "罠にかかる",
    "爆発に巻き込まれる", "借金を背負う", "閉じ込められる", "決闘を申し込まれる",
    "車で爆走する", "空から落ちる", "賞金首になる", "ボタンを押してしまう",

    // ファンタジー・非日常系
    "奇跡が起きる", "タイムリープする", "謎の物体を拾う", "空を飛ぶ", "魔法を使う",
    "猫になる", "宝くじが当たる", "動物と会話する", "透明人間になる",
    "神様が現れる", "伝説の剣を見つける", "幽霊を目撃する", "宇宙人に誘拐される",
    "ゾンビに噛まれる", "呪われる", "時間を止める", "巨大化する", "小人になる",
    "世界を救う", "異世界に迷い込む",

    // その他・アクティビティ
    "美味しい食事", "ダンスを踊る", "大勢の前でスピーチ", "変装して潜入する",
    "ハッキングする", "謎の暗号を解く", "謎の電話がかかってくる", "最高の写真を撮る",
    "絵を描く", "料理対決をする", "スポーツで勝負する", "アイドルにスカウトされる",
    "流れ星に願いをかける", "契約書にサインする", "迷宮入りする"
  ];

  // 共通シチュエーションを引く
  const drawSituation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const random = situations[Math.floor(Math.random() * situations.length)];
      setCommonSituation(random);
      setIsAnimating(false);
    }, 300);
  };

  // プレイヤー個別のイベントカードを引く
  const addPlayerEvent = () => {
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    const newEvent = {
      id: Date.now(),
      text: randomEvent,
      revealed: false,
      rerollCount: 3 // 初期リロール回数
    };
    setPlayerEvents([...playerEvents, newEvent]);
  };

  // イベントカードを削除（プレイヤー削除）
  const removeEvent = (id) => {
    setPlayerEvents(playerEvents.filter(e => e.id !== id));
  };

  // イベントカードを引き直す
  const rerollEvent = (id) => {
    setPlayerEvents(playerEvents.map(event => {
      if (event.id === id && event.rerollCount > 0) {
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        return {
          ...event,
          text: randomEvent,
          rerollCount: event.rerollCount - 1
        };
      }
      return event;
    }));
  };

  // リセット確認表示
  const handleResetClick = () => {
    setShowResetConfirm(true);
  };

  // リセット実行
  const confirmReset = () => {
    setCommonSituation(null);
    setPlayerEvents([]);
    setShowResetConfirm(false);
  };

  // リセットキャンセル
  const cancelReset = () => {
    setShowResetConfirm(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 pb-20 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-md mx-auto space-y-8">
        
        {/* Header */}
        <header className="text-center py-4">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            AI Creation Battle
          </h1>
          <p className="text-slate-400 text-sm mt-1">お題カードディーラー</p>
        </header>

        {/* Image Section (Updated with Modal & Error Handling) */}
        <section className="rounded-2xl overflow-hidden shadow-lg border border-slate-700/50 group relative bg-slate-800">
          <button 
            onClick={() => setIsImageExpanded(true)}
            className="w-full relative cursor-zoom-in block min-h-[200px] flex items-center justify-center"
          >
            {!imageError ? (
              <>
                <img 
                  src="image_c010c3.png" // 文字列指定に戻しました
                  alt="ゲーム説明: 共通カード×個人カード" 
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                  onError={() => setImageError(true)} // エラー時にstateを更新
                />
                {/* Hover Overlay Hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-black/50 p-2 rounded-full text-white backdrop-blur-sm">
                    <Maximize2 size={24} />
                  </div>
                </div>
              </>
            ) : (
              // 画像読み込みエラー時の表示
              <div className="text-center p-8 text-slate-500 flex flex-col items-center">
                <ImageOff size={48} className="mb-3 opacity-50" />
                <span className="font-bold text-slate-400">画像を読み込めませんでした</span>
                <span className="text-xs mt-2 opacity-75 text-slate-500">タップして拡大表示（再読み込み）を試す</span>
              </div>
            )}
          </button>
        </section>

        {/* Expanded Image Modal */}
        {isImageExpanded && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in cursor-zoom-out"
            onClick={() => setIsImageExpanded(false)}
          >
            <button 
              onClick={() => setIsImageExpanded(false)}
              className="absolute top-6 right-6 p-2 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={32} />
            </button>
            
            {/* モーダル内でも画像の表示を試みる */}
            {!imageError ? (
              <img 
                src="image_c010c3.png" // 文字列指定に戻しました
                alt="ゲーム説明拡大" 
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-zoom-in"
                onClick={(e) => e.stopPropagation()}
                onError={() => setImageError(true)}
              />
            ) : (
              <div 
                className="text-white text-center p-6 border border-slate-700 rounded-xl bg-slate-900" 
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-xl font-bold text-red-400 mb-2">画像を表示できません</p>
                <p className="text-slate-400 text-sm">
                  画像のパスが解決できないか、ファイルが見つかりません。<br/>
                  プレビュー環境の制限の可能性があります。
                </p>
              </div>
            )}
          </div>
        )}

        {/* Section 1: Common Situation */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-indigo-300 font-bold uppercase tracking-wider text-xs">
            <Users size={16} />
            共通シチュエーション
          </div>
          
          <div className="relative group perspective">
            {!commonSituation ? (
              <button 
                onClick={drawSituation}
                className="w-full h-40 rounded-2xl border-2 border-dashed border-slate-600 flex flex-col items-center justify-center gap-3 text-slate-500 hover:bg-slate-800/50 hover:border-indigo-500/50 transition-all active:scale-95"
              >
                <Dices size={32} />
                <span className="font-bold">カードを引く</span>
              </button>
            ) : (
              <div className={`
                relative w-full p-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 shadow-xl shadow-indigo-900/30 text-center border border-indigo-400/30
                transform transition-all duration-500 ${isAnimating ? 'rotate-y-90 opacity-0' : 'rotate-y-0 opacity-100'}
              `}>
                <p className="text-indigo-200 text-xs font-bold tracking-widest mb-2">THEME</p>
                <h2 className="text-3xl font-bold text-white drop-shadow-md break-words">
                  {commonSituation}
                </h2>
                <div className="absolute top-3 right-3">
                  <button onClick={drawSituation} className="p-2 bg-black/20 hover:bg-black/40 rounded-full text-white/70 hover:text-white transition">
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Section 2: Player Events (Reverted to single card with Reroll) */}
        {commonSituation && (
          <section className="space-y-4 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-pink-300 font-bold uppercase tracking-wider text-xs">
                <Sparkles size={16} />
                個別イベントカード
              </div>
              <span className="text-xs text-slate-500">{playerEvents.length} Players</span>
            </div>

            <div className="grid gap-3">
              {playerEvents.map((event, index) => (
                <div 
                  key={event.id}
                  className="flex flex-col bg-slate-800 border-l-4 border-pink-500 rounded-r-xl p-4 shadow-md animate-slide-in-right gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-pink-400 font-bold mb-1">PLAYER {index + 1}</span>
                      {/* 3択のoptionsがある場合(旧データ)と、単一のtextがある場合の両方に対応 */}
                      <span className="text-xl font-bold text-white">
                        {event.text || (event.options && event.options[0]) || "カードエラー"}
                      </span>
                    </div>
                    <button 
                      onClick={() => removeEvent(event.id)}
                      className="p-2 text-slate-600 hover:text-red-400 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* 引き直しボタンエリア */}
                  <div className="flex justify-end pt-2 border-t border-slate-700/50">
                    <button 
                      onClick={() => rerollEvent(event.id)}
                      disabled={event.rerollCount <= 0}
                      className={`
                        flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                        ${event.rerollCount > 0 
                          ? 'bg-slate-700 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200' 
                          : 'bg-slate-800 text-slate-600 cursor-not-allowed'}
                      `}
                    >
                      <RotateCcw size={14} />
                      {event.rerollCount > 0 ? `別のカード引く (残り${event.rerollCount}回)` : '変更不可'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={addPlayerEvent}
              className="w-full py-4 rounded-xl border-2 border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-pink-500/50 text-slate-300 hover:text-white flex items-center justify-center gap-2 font-bold transition-all active:scale-95"
            >
              <Plus size={20} />
              プレイヤーを追加 (カードを引く)
            </button>
          </section>
        )}

        {/* Footer */}
        <footer className="pt-8 flex flex-col items-center justify-center">
          {commonSituation && !showResetConfirm && (
            <button 
              onClick={handleResetClick}
              className="text-xs text-slate-500 hover:text-red-400 underline decoration-slate-700 underline-offset-4 transition"
            >
              ゲームをリセット
            </button>
          )}

          {showResetConfirm && (
            <div className="w-full bg-slate-800 p-4 rounded-xl border border-red-500/30 flex flex-col items-center gap-3 animate-fade-in-up">
              <p className="text-sm font-bold text-red-300">本当にリセットしますか？</p>
              <div className="flex gap-3 w-full justify-center">
                <button 
                  onClick={confirmReset}
                  className="flex-1 max-w-[120px] py-2 bg-red-500/20 hover:bg-red-500/40 text-red-200 rounded-lg text-xs font-bold transition"
                >
                  はい、リセット
                </button>
                <button 
                  onClick={cancelReset}
                  className="flex-1 max-w-[120px] py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-xs font-bold transition"
                >
                  キャンセル
                </button>
              </div>
            </div>
          )}
        </footer>

      </div>
      
      <style>{`
        .rotate-y-90 { transform: rotateY(90deg); }
        .rotate-y-0 { transform: rotateY(0deg); }
        .perspective { perspective: 1000px; }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }

        @keyframes zoom-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-zoom-in {
          animation: zoom-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }

        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CardDealerApp;