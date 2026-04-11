"use client";

import { useState } from "react";

export default function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateOutputUrl = (data: string) => {
    return `/api/qr?data=${encodeURIComponent(data)}`;
  };

  const handleGenerate = () => {
    if (!text.trim()) return;
    setLoading(true);
    setQrUrl(generateOutputUrl(text));
    // Simulate slight loading for UI feedback since image fetch takes a moment
    setTimeout(() => setLoading(false), 500); 
  };

  const handleDownload = async () => {
    if (!qrUrl) return;
    try {
      const res = await fetch(qrUrl);
      const blob = await res.blob();
      const objUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objUrl;
      a.download = "qrcode-utilityhub.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objUrl);
    } catch {
      alert("다운로드에 실패했습니다. (Failed to download)");
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">QR 코드 생성기 (QR Generator)</h2>
        <p className="text-gray-500 dark:text-gray-400">텍스트나 링크를 입력하고 즉시 QR 코드를 만드세요.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 bg-white/40 dark:bg-black/20 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 dark:border-white/10 shadow-xl">
        <div className="flex-1 flex flex-col justify-center">
          <label className="block text-sm font-medium text-pink-600 dark:text-pink-400 mb-2">입력 데이터 (URL 또는 일반 텍스트)</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="예: https://example.com&#10;또는 여기에 메모를 입력하세요..."
            className="w-full bg-white/70 dark:bg-gray-900/50 text-gray-900 dark:text-white border-2 border-transparent focus:border-pink-500 dark:focus:border-pink-500 rounded-xl px-4 py-4 min-h-[140px] text-base outline-none transition-all shadow-sm focus:shadow-md resize-none mb-6"
          />
          <button
            onClick={handleGenerate}
            disabled={!text.trim() || loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-lg shadow-lg hover:shadow-pink-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0 flex justify-center items-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><line x1="16" y1="5" x2="22" y2="5"/><line x1="19" y1="2" x2="19" y2="8"/><circle cx="9" cy="9" r="2"/><circle cx="9" cy="15" r="2"/><circle cx="15" cy="15" r="2"/></svg>
            )}
            QR 코드 생성하기
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50/50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-800">
          {qrUrl ? (
            <div className="flex flex-col items-center animate-in zoom-in-95 duration-500">
              <div className="bg-white p-4 rounded-2xl shadow-xl mb-6 relative group">
                <img src={qrUrl} alt="Generated QR Code" className="w-[200px] h-[200px] object-contain transition-transform group-hover:scale-105 duration-300" onLoad={() => setLoading(false)} />
              </div>
              <button
                onClick={handleDownload}
                className="px-6 py-3 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 hover:text-pink-600 dark:hover:text-pink-400 font-semibold shadow-sm hover:shadow-md transition-all flex items-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                이미지 다운로드
              </button>
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 h-[260px]">
               <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><rect x="7" y="7" width="3" height="3"/><rect x="14" y="7" width="3" height="3"/><rect x="7" y="14" width="3" height="3"/><rect x="14" y="14" width="3" height="3"/></svg>
               <p>좌측에서 텍스트를 입력하고<br/>생성 버튼을 누르세요.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
