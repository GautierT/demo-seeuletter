import React, { Component } from 'react'
import axios from 'axios'

class Seeuletter extends Component {

  // On initialise un "etat" (state) par défaut
  state = {
    api_key: '',
    results: null,
    error_message: '',
    loading: false
  }

  submit = async () => {

    try {

      // On ré-initialise à l'état de base : results vide et error_message vide.
      this.setState({
        error_message: '',
        results: null,
        loading: true,
      })

      /*
       On appelle l'API Seeuletter sur la route /letters pour récupérer tous les courriers envoyés avec cette clé.
       On passe this.state.api_key en username pour l'authentification.
        */
      const response = await axios({
        url: `https://api.seeuletter.com/letters`,
        method: 'GET',
        auth: {
          username: this.state.api_key
        },
        data: {
          email: 'TEST',
        },
      })

      // On affiche la réponse complète dans la console.
      console.log('response: ', response)

      // On stocke la réponse dans this.state.results
      this.setState({
        results : response.data,
        loading: false
      })
    } catch(ex) {
      console.log('ex : ', ex)

      // On stocke le message d'erreur dans this.state.error_message
      this.setState({
        error_message: ex.message,
        loading: false
      })
    }

  }

  // On gère le onChange : a chaque caractère entré on change la valeur de this.state.api_key grâce à this.setState()
  handleChange = (event) => {
    console.log('api_key value : ', event.target.value)
    this.setState({api_key: event.target.value})
  }

  render () {
    return (
      <div >
        <div>
            <label>Clé API Seeuletter</label>
          <br/>
          {/* l'input pour rentrer la clé API. Lors d'une frappe sur le clavier this.handleChange est appelé */}
            <input style={{width: '200px', height: '30px'}} value={this.state.api_key} onChange={this.handleChange} placeholder={"Indiquez votre clé API Seeuletter"} />
        </div>
        <br/>
        {/* Bouton valider : lors du clic on appelle this.submit */}
        <button style={{width: '100px', height: '25px'}} onClick={this.submit}>
          Valider
        </button>

        <br/>

        {/* Si la this.state.loading est vrai alors on affiche un message de chargement */}
        {!!this.state.loading && (<p>
          Chargement en cours....
        </p>)}

        <br />

        {/* Si results n'est pas null on affiche les resultats dans un bloc bleu */}
        {!!this.state.results && (
          <div style={{
            margin: 'auto',
            width: '500px',
            border: 'solid 1px blue'
          }}>
          <pre style={{textAlign: 'left'}}>
            <pre style={{ overflow: 'auto' }}>
              Résultat:
              <br/>
              {JSON.stringify(this.state.results, null, 2)}</pre>
          </pre>
          </div>
          )}

        <br />

        {/* Si on a une erreur (this.state.error_message qui n'est pas null) alors on affiche le message en rouge. */}
        {!!this.state.error_message && (
          <p style={{'color': 'red'}}>
            Message d'erreur : <b>{this.state.error_message}</b>
          </p>
        )}


      </div>
    )
  }
}

export default Seeuletter
