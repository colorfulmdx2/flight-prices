import React from "react";
import style from './login-page.module.scss'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {setAuthStatus} from "../../redux-store/reducer";
import {saveState} from "../../_local-storage/local-storage";
import {Redirect, useHistory} from "react-router-dom";
import {AppRootStateType} from "../../redux-store/store";


export const LoginPage = () => {
    const dispatch = useDispatch()

    const isAuth = useSelector<AppRootStateType, boolean>(state => state.reducer.auth)

    const formik = useFormik({
        initialValues: {
            login: '',
            password: ''
        },
        validate: values => {
            if (!values.login.trim())
                return {
                    login: 'Обязательное поле'
                }
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.login)) {
                return {
                    login: 'Некорректный формат логина'
                }
            }
            if (!values.password.trim())
                return {
                    password: 'Обязательное поле'
                }
            if (values.password.trim().length < 8)
                return {
                    password: 'Пароль слишком короткий'
                }
            if (!/^[a-zA-Z1-9]+$/i.test(values.password))
                return {
                    password: 'Используйте латинскую раскладку'
                }

        },
        onSubmit: values => {
            saveState({auth: true})
            dispatch(setAuthStatus(true))
        }
    })




    return (

        <div className={style.container}>

            {isAuth && <Redirect to={'/'}/>}

            <div className={style.background}></div>
            <div className={style.formContainer}>

                <form onSubmit={formik.handleSubmit} className={style.form}>
                    <div className={style.title}>Simple Flight Check</div>
                    <div className={style.inputContainer} style={{width: '100%'}}>
                        <label>Логин</label>
                        <input className={formik.errors.login && style.errorInput} type="text"
                               {...formik.getFieldProps('login')}
                        />
                        {formik.errors.login ?
                            <div className={style.error}>{formik.errors.login && formik.errors.login}</div> : null}
                    </div>
                    <div className={style.inputContainer} style={{width: '100%'}}>
                        <label>Пароль</label>
                        <input className={formik.errors.password && style.errorInput} type="password"
                               {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password ? <div
                            className={style.error}>{formik.errors.password && formik.errors.password}</div> : null}
                    </div>
                    <button type='submit'>Login</button>
                </form>

            </div>
        </div>
    )
}