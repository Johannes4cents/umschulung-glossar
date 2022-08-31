import { useEffect, useState } from "react";
import MainTermsSection from "./bereich_begriffs_liste/MainTermsSection";
import MainExplanationSection from "./bereich_erklaerung/MainExplanationSection";
import useModal from "./hooks/useModal";
import { getCollectionListener, getDocListener } from "./misc/handleFirestore";
import { catList } from "./misc/lists";
import TermEditModal from "./modals/TermEditModal";

function App() {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [terms, setTerms] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [displayedTerms, setDisplayedterms] = useState([]);

  useEffect(() => {
    setSelectedCats(catList.map((c) => c.id));
  }, []);

  useEffect(() => {
    var unsub = null;
    getCollectionListener("terms", (list, unsubscribe) => {
      setTerms(list);
      setDisplayedterms(list);
      unsub = unsubscribe;
    });
    return () => {
      if (unsub) unsub();
    };
  }, []);

  const modal = useModal({
    password: "newTerm",
    position: "bottomLeft",
    modalContent: (
      <TermEditModal
        terms={terms}
        setTerms={setTerms}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        selectedCats={selectedCats}
      />
    ),
    center: true,
    darkOverlay: true,
  });
  return (
    <div className="App">
      <div
        className="divColumn"
        style={{ width: "100%", justifyContent: "center", marginTop: "10px" }}
      >
        <div className="textBoldWhite" style={{ fontSize: "20px" }}>
          Begleitendes Glossar zur Umschulung zum Fachinformatiker im Bereich
          Anwendungsentwicklung
        </div>
      </div>
      <div
        className="divRow"
        style={{
          width: "100%",
          justifyContent: "space-around",
          marginTop: "3%",
        }}
      >
        <MainTermsSection
          displayedTerms={displayedTerms}
          setDisplayedterms={setDisplayedterms}
          selectedTerm={selectedTerm}
          setSelectedTerm={setSelectedTerm}
          selectedCats={selectedCats}
          setSelectedCats={setSelectedCats}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          modal={modal}
        />
        <MainExplanationSection
          selectedTerm={selectedTerm}
          setSelectedTerm={setSelectedTerm}
        />
      </div>
      {modal.element}
    </div>
  );
}

export default App;
