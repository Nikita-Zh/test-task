import React from "react";
import { ChangeEvent, ReactNode, useState } from "react";

interface Param {
  id: number;
  name: string;
  type: "string";
}
interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params?: Param[];
  model?: Model;
}

const mockParams: Param[] = [
  {
    id: 0,
    name: "Назначение",
    type: "string",
  },
  {
    id: 1,
    name: "Цвет",
    type: "string",
  },
  {
    id: 2,
    name: "Длина",
    type: "string",
  },
  {
    id: 3,
    name: "Ширина",
    type: "string",
  },
];
const mockModel: Model = {
  paramValues: [
    { paramId: 0, value: "valueНазначение" },
    { paramId: 1, value: "valueДлина" },
    { paramId: 2, value: "" },
    { paramId: 3, value: "" },
  ],
};

export const ParamEditor = ({
  params = mockParams,
  model = mockModel,
}: Props) => {
  const [modelState, setModelState] = useState<Model>(model);

  const handleFormChange = (e: ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    const paramId = Number(name);

    setModelState((prevState) => ({
      ...prevState,
      paramValues: prevState.paramValues.map((param) => {
        return param.paramId === paramId ? { ...param, value } : param;
      }),
    }));
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
      onChange={handleFormChange}
    >
      {params.map((param) => {
        return (
          <label
            style={{ display: "flex", gap: ".5rem" }}
            key={`input_${param.id}`}
          >
            {param.name}
            <input
              name={`${param.id}`}
              type={"text"}
              defaultValue={
                modelState.paramValues.find((val) => val.paramId === param.id)
                  ?.value
              }
              placeholder={param.name}
            />
          </label>
        );
      })}
    </form>
  );
};

//Реализация классового компонента

type PropsClassComponent = {
  params: Param[];
  model: Model;
};

export class ParamEditorClassComponent extends React.Component<
  PropsClassComponent,
  Model
> {
  constructor(props: PropsClassComponent) {
    super(props);
    this.state = { ...props.model };
  }

  handleFormChange = (e: ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    const paramId = Number(name);

    this.setState((prevState) => ({
      ...prevState,
      paramValues: prevState.paramValues.map((param) => {
        return param.paramId === paramId ? { ...param, value } : param;
      }),
    }));
  };

  render(): ReactNode {
    const { params } = this.props;

    return (
      <form
        style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
        onChange={this.handleFormChange}
      >
        {params.map((param) => {
          return (
            <label
              style={{ display: "flex", gap: ".5rem" }}
              key={`input_${param.id}`}
            >
              {param.name}
              <input
                name={`${param.id}`}
                type={"text"}
                defaultValue={
                  this.state.paramValues.find((val) => val.paramId === param.id)
                    ?.value
                }
                placeholder={param.name}
              />
            </label>
          );
        })}
      </form>
    );
  }
}
