import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useGlobal } from "../../contexts/global";
import AnimatedPage from "../../components/AnimatedPage";
import Block from "../../components/Block";
import Spacer from "../../components/Spacer";
import Select from "../../components/Select";
import Button from "../../components/Button";

import api from "../../services/api";

import { Container } from "./styles";

const ChooseStore = () => {
  const navigate = useNavigate();

  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState({});

  async function getStores() {
    try {
      const { data } = await api.get(`/global/get-stores`);

      setStores(data?.stores);
    } catch (error) {
      toast.error("Erro ao consultar lojas!");
    }
  }

  function proceed() {
    localStorage.setItem("$leparse-loyalty-store-id", selectedStore?.value);
    setTimeout(() => {
      navigate("/tickets");
    }, 500);
  }

  useEffect(() => {
    getStores();
  }, []);

  return (
    <AnimatedPage>
      <Container>
        <Block
          style={{
            width: "50%",
            overflow: "visible",
          }}
        >
          <p>Selecione sua loja</p>
          <Spacer />
          <div className="controls">
            <Select
              compact={false}
              items={stores.map((store) => ({
                label: store?.name,
                value: store?._id,
              }))}
              selectedItem={selectedStore}
              setSelectedItem={setSelectedStore}
            />
            <Button onClick={proceed}>Avançar</Button>
          </div>
        </Block>
      </Container>
    </AnimatedPage>
  );
};

export default ChooseStore;
