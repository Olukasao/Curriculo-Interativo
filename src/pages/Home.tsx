import { useState } from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { About } from "../sections/About";
import { AcessaNetChapter } from "../sections/AcessaNetChapter";
import { AskSection } from "../sections/AskSection";
import { Contact } from "../sections/Contact";
import { CreativeLab } from "../sections/CreativeLab";
import { Expertise } from "../sections/Expertise";
import { Hero } from "../sections/Hero";
import { Intro, introWillPlay } from "../sections/Intro";
import { KollectChapter } from "../sections/KollectChapter";
import { Manifesto } from "../sections/Manifesto";
import { Manipulation } from "../sections/Manipulation";
import { WorkIndex } from "../sections/WorkIndex";
import { WorkscapeChapter } from "../sections/WorkscapeChapter";

/**
 * The exhibition, in order: name → thesis → index → the four chapters →
 * skills → the assistant → who he is → how to reach him.
 */
export default function Home() {
  const [playIntro] = useState(introWillPlay);
  const [heroReady, setHeroReady] = useState(!playIntro);
  useDocumentTitle();

  return (
    <>
      {playIntro && <Intro onReveal={() => setHeroReady(true)} />}
      <main id="main" tabIndex={-1}>
        <Hero ready={heroReady} />
        <Manifesto />
        <WorkIndex />
        <WorkscapeChapter />
        <AcessaNetChapter />
        <CreativeLab />
        <Manipulation />
        <KollectChapter />
        <Expertise />
        <AskSection />
        <About />
        <Contact />
      </main>
    </>
  );
}
