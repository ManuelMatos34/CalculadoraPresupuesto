import React, { useCallback, useMemo } from "react";

import Gastos from "../components/gastos/Gastos";
import Ingresos from "../components/ingresos/Ingresos";
import Ahorros from "../components/ahorros/Ahorros";
import PieChart from "../components/PieChart";
import { useContext } from "react";
import BudgetContext from "../components/gastos/GastosContext";
import { NumericFormat } from "react-number-format";

const Home = () => {
  const { budgetExpenses } = useContext(BudgetContext);

  const graphLegend = budgetExpenses.consolidatedDataGastos.concat(
    budgetExpenses.consolidatedDataAhorros
  );

  const calculateTotal = useCallback(
    (budgetGroup) => {
      return budgetExpenses[budgetGroup].reduce((acc, item) => {
        return acc + item.value;
      }, 0);
    },
    [budgetExpenses]
  );

  const summary = useMemo(() => {
    const totalIncome = calculateTotal("consolidatedDataIngresos");
    const totalExpenses = calculateTotal("consolidatedDataGastos");
    const totalSavings = calculateTotal("consolidatedDataAhorros");

    return {
      totalIncome,
      totalExpenses: totalExpenses + totalSavings,
      totalRemaining: totalIncome - totalExpenses - totalSavings,
    };
  }, [budgetExpenses]);

  return (
    <div
      className="container-md w-100 mt-5"
      style={{ backgroundColor: "#f7f7f7" }}
    >
      <div className="row">
        {/* Columna de la izquierda */}
        <div className="col-md-6">
          <div className="mb-4">
            <div className="card">
              <div className="card-header">Ingresos</div>
              <div className="card-body">
                <Ingresos />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="card">
              <div className="card-header">Gastos</div>
              <div className="card-body">
                <Gastos />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="card">
              <div className="card-header">Ahorros</div>
              <div className="card-body">
                <Ahorros />
              </div>
            </div>
          </div>
        </div>

        {/* Columna de la derecha con fondo gris */}
        <div className="col-md-6" style={{ backgroundColor: "#d3d3d3" }}>
          <h4 className="text-center mt-3">DESGLOSE DEL PRESUPUESTO MENSUAL</h4>
          <div className="container chart-size mt-2">
            <PieChart />
          </div>
          <div>
            {graphLegend.map((elemento, index) => (
              <div className="flex-container" key={index}>
                <span
                  style={{ backgroundColor: elemento.color }}
                  className="color-circle"
                ></span>
                <p className="p-16" style={{ flex: 1 }}>
                  {elemento.nombre}
                </p>
                <p className="p-17">
                  <NumericFormat
                    value={elemento.value}
                    displayType={"text"}
                    thousandSeparator={true}
                  />{" "}
                  RD$
                </p>
              </div>
            ))}
          </div>
          <div>
            <div
              className="card result-size mt-4"
              style={{ backgroundColor: "#d3d3d3", borderRadius: 0 }}
            >
              <div className="card-body">
                <div className="card-text custom-text">
                  <div className="d-flex justify-content-between">
                    Ingreso mensual total
                    <span>
                      RD$
                      <NumericFormat
                        value={summary.totalIncome}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </span>
                  </div>
                  <div className="card-text custom-text">
                    <div className="d-flex justify-content-between">
                      Gastos mensuales totales
                      <span>
                        RD$
                        <NumericFormat
                          value={summary.totalExpenses}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </span>{" "}
                    </div>
                  </div>
                  <hr />
                  <div className="card-text custom-text">
                    <div className="d-flex justify-content-between">
                      Fondos mensuales restantes
                      <span>
                        RD${" "}
                        <NumericFormat
                          value={summary.totalRemaining}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </span>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
