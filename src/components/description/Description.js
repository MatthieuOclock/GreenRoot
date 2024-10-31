import banniere from "./logo-greenroots.jpg";

// Nous utilisons une vidéo comme bannière.
// Nous avons fait un texte explicatif de notre site.
const Description = () => {
  return (
    <>
      <h1>GreenRoots</h1>
      <section className="sectionDescription">
        <img loading="lazy" className="imageDescription" src={banniere}>
          {" "}
        </img>
        <p className="description">
          Dans un monde où les enjeux environnementaux ne cessent de croître, il
          est essentiel que chacun prenne conscience de la fragilité de notre
          environnement. GREEN ROOTS est né de cette envie de faire changer les
          choses et les mentalités, un arbre à la fois. Notre entreprise est le
          fruit d'un partenariat solide avec des municipalités, des associations
          de protection de l'environnement et des amoureux de la nature.
          Ensemble, nous avons créé un concept unique d'e-commerce qui permet
          aux individus de contribuer à la reforestation, tout en laissant leur
          empreinte personnelle dans la nature. L'idée est simple : les clients
          achètent des arbres sur notre plateforme, et nous nous chargeons de
          les planter dans des zones spécifiques en collaboration avec les
          autorités locales. La transparence à chaque étape Les clients peuvent
          suivre la croissance de leur arbre en ligne. Cette solution permet de
          créer un lien émotionnel entre l'individu, la nature et sa communauté,
          sans altérer l'esthétique des espaces verts.
        </p>
      </section>
    </>
  );
};

export default Description;
