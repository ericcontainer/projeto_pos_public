// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { useTheme } from "@mui/material/styles";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import {
  EmpresaProps,
  PostProps,
  ContaProps,
  CampanhaProps,
} from "../../entidades/iterfaces";
import {
  getEmpresaService,
  getPostService,
  getContaService,
  getUsuarioService,
  getCampanhaService,
} from "../../services/commonServices";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const PieDash = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [nuser, setNuser] = useState(0);
  const [ncompany, setCompnay] = useState(0);
  const [npost, setPost] = useState(0);
  const [ncampanha, setCampanha] = useState(0);
  // const [conta, setConta] = useState(0);

  useEffect(() => {
    getEmpresaService().then((r) => {
      r.json().then((j) => {
        const finalData: Array<EmpresaProps> = [];
        j["data"].map((s: EmpresaProps) => {
          if (s.status == "ativo") {
            finalData.push(s);
          }
        });
        setCompnay(finalData.length);
      });
    });
    getPostService().then((r) => {
      r.json().then((j) => {
        const finalData: Array<PostProps> = [];
        j["data"].map((v: PostProps) => {
          if (v.status === "ativo") finalData.push(v);
        });
        setPost(finalData.length);
      });
    });
    getContaService().then((r) => {
      r.json().then((j) => {
        const finalData: Array<ContaProps> = [];
        j["data"].map((s: ContaProps) => {
          if (s.status == "ativo") {
            finalData.push(s);
          }
        });
        // setConta(finalData.length);
      });
    });
    getUsuarioService().then((r) => {
      r.json().then((j) => {
        setNuser(j["data"].length);
      });
    });
    getCampanhaService().then((r) => {
      r.json().then((j) => {
        const finalData: Array<CampanhaProps> = [];
        j["data"].map((s: CampanhaProps) => {
          if (s.status == "ativo") {
            finalData.push(s);
          }
        });
        setCampanha(finalData.length);
      });
    });
  }, []);

  const data = [
    {
      id: "Empresas",
      label: "Empresas",
      value: ncompany,
      color: "hsl(120, 70%, 50%)",
    },
    {
      id: "Usuários",
      label: "Usuários",
      value: nuser,
      color: "hsl(14, 70%, 50%)",
    },
    {
      id: "Campanhas",
      label: "Campanhas",
      value: ncampanha,
      color: "hsl(151, 70%, 50%)",
    },
    {
      id: "Posts",
      label: "Posts",
      value: npost,
      color: "hsl(175, 70%, 50%)",
    },
  ];
  return (
    <>
      <h6 style={{ textAlign: "center", marginTop: "10px" }}>
        Métricas Principais
      </h6>
      <ResponsivePie
        data={data}
        margin={{ top: 10, right: 80, bottom: 100, left: 100 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={colors.grey[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "Posts",
            },
            id: "dots",
          },
          {
            match: {
              id: "c",
            },
            id: "dots",
          },
          {
            match: {
              id: "go",
            },
            id: "dots",
          },
          {
            match: {
              id: "python",
            },
            id: "dots",
          },
          {
            match: {
              id: "Empresas",
            },
            id: "lines",
          },
          {
            match: {
              id: "empresas",
            },
            id: "lines",
          },
          {
            match: {
              id: "elixir",
            },
            id: "lines",
          },
          {
            match: {
              id: "javascript",
            },
            id: "lines",
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: colors.primary[100],
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: colors.primary[800],
                },
              },
            ],
          },
        ]}
      />
    </>
  );
};
export default PieDash;
