import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import warningIcon from "../../assets/images/icons/warning.svg";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import "./styles.css";
import api from "../../services/api";

function TeacherForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");
  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);
  const [loading, setLoading] = useState(false); // State for loading status

  const addNewScheduleItem = () => {
    setScheduleItems([...scheduleItems, { week_day: 0, from: "", to: "" }]);
  };

  const setScheduleItemValue = (
    position: number,
    field: string,
    value: string
  ) => {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }
      return scheduleItem;
    });
    setScheduleItems(updatedScheduleItems);
  };

  const handleCreateClass = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      await api.post("classes", {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      });
      alert("Cadastro realizado com sucesso!");
      // Clear fields after successful submission
      setName("");
      setAvatar("");
      setWhatsapp("");
      setBio("");
      setSubject("");
      setCost("");
      setScheduleItems([{ week_day: 0, from: "", to: "" }]); // Reset schedule items
      navigate("/"); // Use navigate instead of history
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Erro no cadastro!");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aula!"
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <Input
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              options={[
                { value: "Artes", label: "Artes " },
                { value: "Biologia", label: "Biologia " },
                { value: "Ciência", label: "Ciência " },
                { value: "Educação Física", label: "Educação Física " },
                { value: "Geografia", label: "Geografia " },
                { value: "Música", label: "Música " },
                { value: "Matemática", label: "Matemática " },
                { value: "Química", label: "Química " },
                { value: "Português", label: "Português " },
                { value: "Inglês", label: "Inglês " },
              ]}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, index) => (
              <div key={index} className="schedule-item"> {/* Change key to index */}
                <Select
                  name="week_day"
                  label="Dia da Semana"
                  value={scheduleItem.week_day}
                  onChange={(e) =>
                    setScheduleItemValue(index, "week_day", e.target.value)
                  }
                  options={[
                    { value: "0", label: "Domingo " },
                    { value: "1", label: "Segunda-feira " },
                    { value: "2", label: "Terça-feira " },
                    { value: "3", label: "Quarta-feira " },
                    { value: "4", label: "Quinta-feira " },
                    { value: "5", label: "Sexta-feira " },
                    { value: "6", label: "Sábado " },
                  ]}
                />
                <Input
                  name="from"
                  label="Das"
                  type="time"
                  value={scheduleItem.from}
                  onChange={(e) =>
                    setScheduleItemValue(index, "from", e.target.value)
                  }
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={(e) =>
                    setScheduleItemValue(index, "to", e.target.value)
                  }
                />
              </div>
            ))}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso Importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit" disabled={loading}> {/* Disable button when loading */}
              {loading ? "Salvando..." : "Salvar cadastro"} {/* Change button text when loading */}
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
