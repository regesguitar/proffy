import React from 'react'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

function TeacherItem(){
    return(
        <article className="teacher-item">
        <header>
            <img src="https://avatars2.githubusercontent.com/u/50219913?s=460&u=36c9845fd3343d61e81e3815bd2018f8a4da6aa5&v=4" alt="Bruno Reges"/>
        <div>
            <strong>Bruno Reges</strong>
            <span>Guitarra</span>
        </div>
        </header>

        <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure ex numquam pariatur? 
            <br/><br/>
            Provident tenetur doloremque, vel voluptate dolorum incidunt cum eius magnam. Earum, exercitationem repellendus. Delectus officia ab at quia?
        </p>
        <footer>
            <p>
                Preço/hora
                <strong>R$80,00</strong>
            </p>
            <button type="button">
                <img src={whatsappIcon} alt="Whatsapp"/>
                Entrar em contato
            </button>
        </footer>
    </article>
    )
}

export default TeacherItem;