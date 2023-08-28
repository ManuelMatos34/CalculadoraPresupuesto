import React, { useContext, useMemo } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import BudgetContext from "./gastos/GastosContext";

const PieChart = () => {
  const { budgetExpenses } = useContext(BudgetContext);

  const summedData = budgetExpenses.consolidatedDataGastos.map(
    (item) => item.value
  );

  ChartJS.register(ArcElement, Tooltip, Legend);
  ChartJS.register(ChartDataLabels);

  const chartData = {
    backgroundColor: budgetExpenses.consolidatedDataGastos.map(
      (item) => item.color
    ),
  };

  const summedDataInitialized = useMemo(() => {
    return summedData.find((item) => item !== 0);
  }, [summedData]);

  const options = {
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });

          // Verifica si estás usando los datos por defecto
          const isDefaultData = sum === 9; // Porque 1 + 1 + ... + 1 = 9

          if (isDefaultData) {
            return ""; // No mostrar nada para los datos por defecto
          } else {
            let percentage = ((value * 100) / sum).toFixed(2) + "%";
            return percentage;
          }
        },
        color: "#fff",
      },
    },
  };

  const filteredData = budgetExpenses.consolidatedDataGastos
    .filter((item) => item.value !== 0)
    .map((item) => item.value);

  const filteredColors = budgetExpenses.consolidatedDataGastos
    .filter((item) => item.value !== 0)
    .map((item) => item.color);

  const hasData = filteredData.length > 0;

  const data = {
    datasets: [
      {
        data: hasData ? filteredData : [1, 1, 1, 1, 1, 1, 1, 1, 1],
        backgroundColor: hasData ? filteredColors : chartData.backgroundColor,
      },
    ],
  };
  return (
    <div className="container">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
