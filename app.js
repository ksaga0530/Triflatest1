
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs
} from './firebase-config.js';
import { generateQuiz } from './gemini-config.js';

// DOM要素
const loginForm = document.getElementById('login-form');
const googleLoginBtn = document.getElementById('google-login');
const keywordInput = document.getElementById('keywords-input');
const createBtn = document.getElementById('create-flashcards');
const flashcardsContainer = document.getElementById('flashcards-container');
const recentDeckSection = document.getElementById('recent-deck');

// ログイン処理
googleLoginBtn.addEventListener('click', async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    loadUserData();
  } catch (error) {
    console.error("Googleログインエラー:", error);
  }
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    loadUserData();
  } catch (error) {
    console.error("メールログインエラー:", error);
  }
});

// 単語帳作成
createBtn.addEventListener('click', async () => {
  const keywords = keywordInput.value.split(',').map(k => k.trim()).filter(k => k);
  if (keywords.length !== 3) {
    alert('正確に3つのキーワードをカンマ区切りで入力してください');
    return;
  }

  const quizData = await generateQuiz(keywords);
  if (!quizData || !quizData.questions) {
    alert('問題の生成に失敗しました');
    return;
  }

  await saveFlashcards(keywords, quizData.questions);
  displayFlashcards(quizData.questions);
});

// データ保存
async function saveFlashcards(keywords, questions) {
  const user = auth.currentUser;
  if (!user) return;

  const deckId = Date.now().toString();
  const deckRef = doc(db, "users", user.uid, "flashcards", deckId);

  await setDoc(deckRef, {
    keywords,
    questions,
    createdAt: new Date(),
    lastStudied: new Date()
  });
}

// データ読み込み
async function loadUserData() {
  const user = auth.currentUser;
  if (!user) return;

  const q = query(
    collection(db, "users", user.uid, "flashcards"),
    orderBy("lastStudied", "desc"),
    limit(1)
  );

  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const recentDeck = querySnapshot.docs[0].data();
    displayRecentDeck(recentDeck);
  }
}

// UI表示
function displayFlashcards(questions) {
  flashcardsContainer.innerHTML = '';

  questions.forEach((q, i) => {
    const card = document.createElement('div');
    card.className = 'flashcard';
    card.innerHTML = `
      <div class="card-front">
        <h3>問題 ${i+1}</h3>
        <p>${q.hints.join(' + ')}</p>
      </div>
      <div class="card-back">
        <h3>答え</h3>
        <p>${q.answer}</p>
      </div>
    `;
    card.addEventListener('click', () => card.classList.toggle('flipped'));
    flashcardsContainer.appendChild(card);
  });
}

function displayRecentDeck(deck) {
  recentDeckSection.innerHTML = `
    <h2>最近学習した単語帳</h2>
    <p>キーワード: ${deck.keywords.join(', ')}</p>
    <button onclick="displayFlashcards(${JSON.stringify(deck.questions)})">
      学習を再開
    </button>
  `;
}

// 初期化
auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('app-section').style.display = 'block';
    loadUserData();
  } else {
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('app-section').style.display = 'none';
  }
});
