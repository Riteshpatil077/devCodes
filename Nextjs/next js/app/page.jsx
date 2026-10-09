import LikeButton from './like-button';

 
function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

function HomePage(){
    const names = ['Alice', 'Bob', 'Charlie'];
    return (
        <div>
      <Header title="Develop. Preview. Ship." />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <LikeButton />
     
    </div>
    )
}

export default HomePage;