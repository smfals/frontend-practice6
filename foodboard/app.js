$(function () {
  loadData();
});

// fetch读取本地JSON + 三种状态
async function loadData() {
  const $tip = $("#statusTip");

  // 加载中
  $tip.text("⏳ 正在加载数据...");

  try {
    const res = await fetch("./data.json");

    if (!res.ok) {
      // 加载失败
      $tip.text("❌ 数据加载失败！请检查文件路径或使用Live Server打开。");
      return;
    }

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      // 空数据
      $tip.text("⚠️ 暂无数据（空数据）");
      return;
    }

    // 加载成功
    $tip.text("✅ 数据加载完成");
    window.rawData = data;
    console.log("拿到的数据：", data);

  } catch (err) {
    $tip.text("❌ 数据加载异常：" + err.message);
    console.error(err);
  }
}