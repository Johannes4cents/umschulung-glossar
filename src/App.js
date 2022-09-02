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

function App() {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [terms, setTerms] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [displayedTerms, setDisplayedterms] = useState([]);
  const [questions, setQuestions] = useState([]);
  const { setInfo, loggedIn, info } = miscStore();

  useEffect(() => {
    var unsub = null;
    getCollectionListener("questions", (list, unsubscribe) => {
      unsub = unsubscribe;
      setQuestions(list);
    });
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
    getCollectionListener("terms", (list, unsubscribe) => {
      setTerms(list);
      setDisplayedterms(list);
      unsub = unsubscribe;
    });
    return () => {
      if (unsub) unsub();
    };
  }, []);

  const loginModal = useModal({
    password: "signupModal",
    modalContent: <SignUpWithEMailModal />,
    offsetY: 10,
    translate: { x: 100, y: 0 },
    position: "bottomLeft",
  });

  const modal = useModal({
    password: "newTerm",
    position: "bottomLeft",
    modalContent: (
      <TermEditModal setSelectedTerm={setSelectedTerm} terms={terms} />
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
        <div
          className="divRow"
          style={{ width: "100%", justifyContent: "center" }}
        >
          <div style={{ flex: 1 }}></div>
          <div className="textBoldWhite" style={{ fontSize: "20px" }}>
            Begleitendes Glossar zur Umschulung zum Fachinformatiker im Bereich
            Anwendungsentwicklung
          </div>
          <div
            onClick={() => {
              console.log("info - ", info);
            }}
            className="divRow"
            style={{ flex: 1, justifyContent: "end", marginRight: "5px" }}
          >
            {!loggedIn && (
              <img
                style={{ alignSelf: "end" }}
                className="icon40"
                src="/images/icons/btn_password_sign_in.png"
                onClick={() => loginModal.open("signupModal")}
              />
            )}
            {loggedIn && (
              <div className="divColumn">
                <div className="textWhite">Logged in as</div>
                <div className="textBoldWhite">{info.username}</div>
              </div>
            )}
          </div>
        </div>
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
          modal={modal}
        />
        <MainExplanationSection
          terms={terms}
          editModal={modal}
          selectedTerm={selectedTerm}
          setSelectedTerm={setSelectedTerm}
          questions={questions}
        />
      </div>
      {modal.element}
      {loginModal.element}
      <ToastContainer />
    </div>
  );
}

export default App;
