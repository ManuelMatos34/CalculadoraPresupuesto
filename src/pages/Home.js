import React from "react";

import Gastos from "../components/gastos/Gastos";
import Ingresos from "../components/ingresos/Ingresos";
import Ahorros from "../components/ahorros/Ahorros";
import PieChart from "../components/PieChart";
import { useContext } from "react";
import BudgetContext from "../components/gastos/GastosContext";

const Home = () => {
  const { budgetExpenses } = useContext(BudgetContext);

  return (
    <>
      <div className="d-flex flex-column">

        <div className="p-2 m-2">
          <h3>Budgeting Calculator</h3>
          <h4>Learn how to gain control of your saving and spending</h4>
          <p>Use this budget calculator to plan for your savings goals and manage your expenses.
            Fill out all fields that apply to you, and make adjustments to see how you could save more.
            In the income field, enter your take-home pay—the amount you have after withholding taxes, paying for benefits,
            or contributing to pre-tax retirement accounts.
          </p>
        </div>
        <div className="container box-style content-size" style={{ backgroundColor: "#ffffff" }}>
          <div className="row m-2">
            {/* Columna de la izquierda */}
            <div className="col-md-6">
              <div className="mb-4">
                <div>
                  <div className="mt-5">
                    <Ingresos />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div>
                  <div>
                    <Gastos />
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <Ahorros />
                  </div>
                </div>
              </div>
            </div>
            {/* Columna de la derecha con fondo gris */}
            <div className="col-md-6 mt-3" style={{ backgroundColor: "#f5f5f6", borderRadius: 12 }}>
              <h4 className="text-center mt-3">DESGLOSE DEL PRESUPUESTO MENSUAL</h4>
              <div className="container chart-size mt-2">
                <PieChart />
              </div>
              <div>
                {budgetExpenses.consolidatedDataGastos.map((elemento, index) => (
                  <div className="flex-container" key={index}>
                    <span
                      style={{ backgroundColor: elemento.color }}
                      className="color-circle"
                    ></span>
                    <p className="p-16" style={{ flex: 1 }}>
                      {elemento.nombre}
                    </p>
                    <p className="p-17">{elemento.value} RD$</p>
                  </div>
                ))}
              </div>
              <div>
                <div className="card result-size mt-4 mb-3" style={{ backgroundColor: "#f5f5f6", borderRadius: 0 }}>
                  <div className="card-body">
                    <p className="card-text custom-text">
                      <div className="d-flex justify-content-between">
                        Ingreso mensual total
                        <span>RD$ 0</span>
                      </div>
                    </p>
                    <p className="card-text custom-text">
                      <div className="d-flex justify-content-between">
                        Gastos mensuales totales
                        <span>RD$ 0</span>
                      </div>
                    </p>
                    <hr />
                    <p className="card-text custom-text">
                      <div className="d-flex justify-content-between">
                        Fondos mensuales restantes
                        <span>RD$ 0</span>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div></div>

    </>
  );
};

export default Home;
