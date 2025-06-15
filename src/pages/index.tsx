import React, { useEffect, useState } from "react";

const messages = [
  "Olá Coisinha!",
  "dessa vez não pude fazer uma carta, porém, mais uma vez vindo aqui te desejar...",
  "Só te desejar mesmo coisa linda, maravilhosa, deusa encorporada em um pedacinho de gente que eu tanto admiro",
  "Ter você por perto me faz sentir vivo, me faz sorrir, me faz sonhar e criar planos que eu desejo concretizar ao seu lado",
  "Eu te amo, obrigado por fazer parte do meu mundo! ♥",
  "Por todo tempo em que o tempo nos proporcionar!",
];

const Home: React.FC = () => {
  const [step, setStep] = useState(0); // índice da mensagem atual
  const [typedText, setTypedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [animateKey, setAnimateKey] = useState(0); // força animação de entrada

  // Efeito de digitação
  useEffect(() => {
    const currentMessage = messages[step];
    if (charIndex < currentMessage.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + currentMessage.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, 50); // velocidade da digitação (menor = mais rápido)
      return () => clearTimeout(timeout);
    }
  }, [charIndex, step]);

  const handleClick = () => {
    if (step < messages.length - 1) {
      setTypedText("");
      setCharIndex(0);
      setStep((prev) => prev + 1);
      setAnimateKey((prev) => prev + 1);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 key={animateKey} className="slide-in">
          {typedText}
          <span className="cursor">|</span>
        </h1>

        {/* Mostra botão apenas se ainda houver mensagens restantes */}
        {charIndex === messages[step].length && step < messages.length - 1 && (
          <button style={styles.button} onClick={handleClick}>
            ►
          </button>
        )}

        {/* Mostra imagem após a última mensagem ser digitada */}
        {charIndex === messages[step].length && step === messages.length - 1 && (
          <div className="image-container">
            {["/minha-linda.png", "/nos-quatro.png", "/sorriso.png"].map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Imagem ${index + 1}`}
                className="fade-in"
                style={{
                  margin: "1rem",
                  maxWidth: "200px",
                  borderRadius: "1rem",
                }}
              />
            ))}
          </div>
        )}

      </div>

      <style jsx>{`
        .slide-in {
          animation: slideIn 0.5s ease forwards;
          font-size: 2rem;
          color: orange;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .cursor {
          display: inline-block;
          animation: blink 1s infinite;
          color: orange;
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .fade-in {
          animation: fadeIn 1s ease forwards;
          opacity: 0;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#011129",
    padding: "1rem",
  },
  content: {
    textAlign: "center",
    maxWidth: "600px",
  },
  button: {
    marginTop: "2rem",
    padding: "1rem 2rem",
    fontSize: "1rem",
    borderRadius: "8px",
    backgroundColor: "orange",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default Home;
