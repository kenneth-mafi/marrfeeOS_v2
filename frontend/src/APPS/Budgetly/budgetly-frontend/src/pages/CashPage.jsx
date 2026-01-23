import { Component } from "react";
import SubHeader from "../components/header/Header2";
import MainPageFrame from "./mainPageFrame/MainPageFrame";


function CashPage() {

    const cashPageComponents = [
        {
          Component: <SubHeader />,
          props: {title: "Cash Overview"}
        }
    ]

    return <MainPageFrame components={cashPageComponents}  effect="slideInRight" />
}

export default CashPage;