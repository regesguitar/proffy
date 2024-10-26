import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';
import api from '../../services/api';

export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    const createNewConnection = async () => {
        try {
            await api.post('connections', {
                user_id: teacher.id,
            });
            alert("Conexão criada com sucesso!"); // Feedback ao usuário
        } catch (error) {
            console.error("Erro ao criar conexão:", error);
            alert("Erro ao criar conexão, tente novamente!"); // Tratamento de erro
        }
    };

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name} />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>{teacher.bio}</p>
            <footer>
                <p>
                    Preço/hora
                    <strong>R$ {teacher.cost}</strong>
                </p>

                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={createNewConnection}
                    href={`https://wa.me/${teacher.whatsapp}`}
                >
                    <img src={whatsappIcon} alt="Whatsapp" />
                    Entrar em contato
                </a>
            </footer>
        </article>
    );
};

export default TeacherItem;
