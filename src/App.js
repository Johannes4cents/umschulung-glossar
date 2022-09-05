import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import MainTermsSection from "./bereich_begriffs_liste/MainTermsSection";
import MainExplanationSection from "./bereich_erklaerung/MainExplanationSection";
import useModal from "./hooks/useModal";
import { getCollectionListener, getDocListener } from "./misc/handleFirestore";
import { catList } from "./misc/lists";
import SignUpWithEMailModal from "./modals/SignUpWithEmailModal";
import TermEditModal from "./modals/TermEditModal";
import miscStore from "./stores/miscStore";
import "react-toastify/dist/ReactToastify.css";
import ClickedImageContainer from "./components/ClickedImageContainer";
import MainNuetzlicheLinks from "./bereich_begriffs_liste/nuetzlicheLinks/MainNuetzlicheLinks";
import PageTopBar from "./components/PageTopBar";

function App() {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [terms, setTerms] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [displayedTerms, setDisplayedterms] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [displayedLinks, setDisplayedLinks] = useState([]);
  const [links, setLinks] = useState([]);

  const { setInfo, loggedIn, info } = miscStore();

  useEffect(() => {
    var unsub = null;
    getCollectionListener("questions", (list, unsubscribe) => {
      unsub = unsubscribe;
      setQuestions(list);
    });

    return () => {
      if (unsub) unsub();
    };
  }, []);

  function checkUserStartup() {
    let localInfo = JSON.parse(localStorage.getItem("info"));
    if (localInfo != null) {
      console.log("localInfo - ", localInfo);
      setInfo(localInfo);
    }
  }

  useEffect(() => {
    setSelectedCats(catList.map((c) => c.id));
    checkUserStartup();
  }, []);

  useEffect(() => {
    var unsub = null;
    var unsubLinks = null;
    getCollectionListener("terms", (list, unsubscribe) => {
      setTerms(list);
      setDisplayedterms(list);
      unsub = unsubscribe;
    });

    getCollectionListener("links", (list, unsubscribe) => {
      setLinks(list ?? []);
      setDisplayedLinks(list ?? []);
      unsubLinks = unsubscribe;
    });

    return () => {
      if (unsubLinks) unsubLinks();
    };
  }, []);

  const modal = useModal({
    password: "newTerm",
    position: "bottomLeft",
    modalContent: (
      <TermEditModal
        setSelectedTerm={setSelectedTerm}
        terms={terms}
        links={links}
        displayedLinks={displayedLinks}
        setDisplayedLinks={setDisplayedLinks}
      />
    ),
    center: true,
    darkOverlay: true,
  });
  return (
    <div className="App">
      <ClickedImageContainer />
      <div
        className="divColumn"
        style={{ width: "100%", justifyContent: "center", marginTop: "10px" }}
      >
        <PageTopBar />
      </div>
      <div
        className="divRow"
        style={{
          width: "100%",
          justifyContent: "space-around",
          marginTop: "3%",
          alignItems: "baseline",
        }}
      >
        <MainNuetzlicheLinks
          displayedLinks={displayedLinks}
          setDisplayedLinks={setDisplayedLinks}
          links={links}
          terms={terms}
          selectedCats={selectedCats}
        />

        <MainTermsSection
          terms={terms}
          displayedTerms={displayedTerms}
          setDisplayedterms={setDisplayedterms}
          selectedTerm={selectedTerm}
          setSelectedTerm={setSelectedTerm}
          selectedCats={selectedCats}
          setSelectedCats={setSelectedCats}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          links={links}
          setDisplayedLinks={setDisplayedLinks}
          displayedLinks={displayedLinks}
          modal={modal}
        />
        <MainExplanationSection
          terms={terms}
          editModal={modal}
          selectedTerm={selectedTerm}
          setSelectedTerm={setSelectedTerm}
          questions={questions}
          links={links}
        />
      </div>
      {modal.element}

      <ToastContainer />
    </div>
  );
}

export default App;
