function init() {
    var k = 0;
    const height = window.innerHeight;
    const width = window.innerWidth;
    while(1){
        // div要素作成
        var div = document.createElement("div");
        div.setAttribute("id", String(k));
        div.setAttribute("class", k&1 ? 'upper' : 'downer');
        document.body.appendChild(div);

        // 横長直方体
        var boxH = Math.floor(Math.random() * 100)+100;
        var boxW = Math.floor(Math.random() * 100) + boxH;
        document.getElementById(k).style.width = `${boxW}px`;
        document.getElementById(k).style.height = `${boxH}px`;
        document.getElementById(k).style.position = 'fixed';

        if (k&1) { // 上昇直方体の位置情報設定
            document.getElementById(k).style.top = `${Math.random() * 2 * height}px`;
            document.getElementById(k).style.left = `${-1 * boxW}px`;
        } else { // 下降直方体の位置情報設定
            document.getElementById(k).style.top = `${(Math.floor(Math.random()*2) ? 1 : -1) * Math.random() * height}px`;
        }

        // document.getElementById(k).innerHTML = `<h1 style="padding:0;margin:0;text-align:center;line-height:${boxH}px">${k}</h1>`;
        // アニメーションの遅延時間設定
        document.getElementById(k).style.animationDelay = `${Math.floor(Math.random()*-50)}s`;

        // インクリメント
        k = (k+1)|0;
        if(k>100) break;
    }
}

window.addEventListener("DOMContentLoaded", init);
