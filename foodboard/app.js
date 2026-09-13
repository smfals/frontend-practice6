let myEchart = null;
let myChartJS = null;

$(function () {
  loadData();

  // jQuery筛选交互
  $("#filterBtn").on("click", function () {
    const allData = window.rawData || [];
    const filtered = allData.filter(item => item.people > 100);
    renderCharts(filtered);
  });
});

async function loadData() {
  const $tip = $("#statusTip");
  $tip.text("⏳ 正在加载数据...");

  try {
    const res = await fetch("./data.json");

    if (!res.ok) {
      $tip.text("❌ 数据加载失败！请检查文件路径或使用Live Server打开。");
      return;
    }

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      $tip.text("⚠️ 暂无数据（空数据）");
      return;
    }

    $tip.text("✅ 数据加载完成");
    window.rawData = data;
    renderCharts(data);

  } catch (err) {
    $tip.text("❌ 数据加载异常：" + err.message);
    console.error(err);
  }
}

// 渲染两张图表：ECharts柱状图 + Chart.js饼图
function renderCharts(data) {
  const eDom = document.getElementById("eChartBox");
  const cDom = document.getElementById("chartjsBox");

  const names = data.map(d => d.place);
  const peoples = data.map(d => d.people);
  const scores = data.map(d => d.score);

  // ECharts柱状图
  if (!myEchart) {
    myEchart = echarts.init(eDom);
  }
  myEchart.setOption({
    xAxis: { type: "category", data: names },
    yAxis: { type: "value", name: "人次" },
    series: [{ type: "bar", data: peoples }]
  });

  // Chart.js饼图
  if (myChartJS) {
    myChartJS.destroy();
  }
  myChartJS = new Chart(cDom, {
    type: "pie",
    data: {
      labels: names,
      datasets: [{ data: scores }]
    }
  });
}