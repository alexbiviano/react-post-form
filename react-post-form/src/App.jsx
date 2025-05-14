import { useState } from 'react'
import axios from 'axios';


function App() {

  const endPoint = ('https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts');

  const [formPosts, setFormPosts] = useState({
    author: '',
    title: '',
    body: '',
    public: false
  })

  const [alert, setAlert] = useState({ type: '', message: '', alert: '' });


  function handleFormPosts(event) {
    const value =
      event.target.type === 'checkbox' ?
        event.target.checked : event.target.value;

    setFormPosts((formPosts) => ({
      ...formPosts,
      [event.target.name]: value,
    }));
  };

  function savePost(event) {
    event.preventDefault();

    console.log(formPosts);


    axios.post(endPoint, formPosts)
      .then(res => {
        console.log(res.posts);
        setAlert({
          type: 'Corretto',
          message: 'Post aggiunto con successo!',
          alert: 'Post aggiunto con successo!'

        });
      })
      .catch(error => {
        console.log(error);
        setAlert({
          type: 'Sbagliato',
          message: 'Invio del post non riuscito!',
          alert: 'Invio del post non riuscito!'

        });
      });

  }


  return (
    <>
      <div className='container bg-info'>
        {alert.message && (
          <div className={`alert alert-${alert.type}`}>
            {alert.message}

          </div>
        )}
        <form onSubmit={savePost}>
          <div className="mb-3">
            <label className="form-label">Autore</label>
            <input type="text"
              name='author'
              value={formPosts.author}
              onChange={handleFormPosts}
              placeholder='Inserisci autore'
              className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Titolo</label>
            <input type="text"
              name='title'
              value={formPosts.title}
              onChange={handleFormPosts}
              placeholder='Inserisci titolo'
              className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Testo</label>
            <input type="text"
              name='body'
              value={formPosts.body}
              onChange={handleFormPosts}
              placeholder='Inserisci testo'
              className="form-control" />
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox"
              name='public'
              checked={formPosts.public}
              onChange={handleFormPosts}
              id='public'
              className="form-check-input" />
            <label className="form-check-label">Disponibile</label>
          </div>
          <button type="submit" className="btn btn-primary">Invia</button>
        </form>
      </div>


    </>
  )
}

export default App;