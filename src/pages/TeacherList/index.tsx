import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';


import TeacherItem from '../../components/TeachersItem';
import api from '../../services/api';
import Input from '../../components/Input'

import './styles.css'
import Select from '../../components/Select';

function TeacherList() {
    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

  async  function searchTeachers(e: FormEvent) {
        e.preventDefault()

       const response =  await  api.get('classes', {

            params: {
                subject,
                week_day,
                time,
            }
        })
            console.log(response.data)
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">

                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value) }}
                        options={[
                            { value: 'Artes', label: 'Artes ' },
                            { value: 'Biologia', label: 'Biologia ' },
                            { value: 'Ciência', label: 'Ciência ' },
                            { value: 'Educação Física', label: 'Educação Física ' },
                            { value: 'Geografia', label: 'Geografia ' },
                            { value: 'Música', label: 'Música ' },
                            { value: 'Matemática', label: 'Matemática ' },
                            { value: 'Química', label: 'Química ' },
                            { value: 'Português', label: 'Português ' },
                            { value: 'Inglês', label: 'Inglês ' },

                        ]}
                    />

                    <Select
                        name="week_day"
                        label="Dia da Semana"
                        value={week_day}
                        onChange={(e) => { setWeekDay(e.target.value) }}
                        options={[
                            { value: '0', label: 'Domingo ' },
                            { value: '1', label: 'Segunda-feira ' },
                            { value: '2', label: 'Terça-feira ' },
                            { value: '3', label: 'Quarta-feira ' },
                            { value: '4', label: 'Quinta-feira ' },
                            { value: '5', label: 'Sexta-feira ' },
                            { value: '6', label: 'Sábado ' },

                        ]}
                    />

                    <Input
                        type="time"
                        name="time"
                        label="Hora"
                        value={time}
                        onChange={(e) => { setTime(e.target.value) }}
                    />
                    <button type="submit">
                        Buscar
                </button>
                </form>
            </PageHeader>
            <main>
                <TeacherItem />
            </main>
        </div>
    )
}

export default TeacherList;