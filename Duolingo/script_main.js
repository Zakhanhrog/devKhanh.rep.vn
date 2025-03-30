const PAGES = {
    WELCOME: 'welcomePage',
    LEVEL: 'levelPage',
    MOTIVATION: 'motivationPage',
    GOAL: 'goalPage',
    SUMMARY: 'summaryPage',
    ACHIEVEMENT: 'achievementPage',
    COMPLETE: 'completePage',
    PROFILE: 'profilePage',
    STUDY: 'studyPage',
    COURSE: 'coursePage'
  };
  
  // Biến toàn cục
  let currentPage = null;
  let currentQuestionIndex = 0;
  let currentSelectedAnswer = null;
  let score = 0;
  let selectedPairs = {};
  let userAnswers = [];
  let userAvatar = null;
  let isAdmin = true;
  let currentPairs = {};
  let colorIndex = 0;
  const pairColors = ['#FFD166', '#06D6A0', '#118AB2', '#EF476F', '#7B2CBF'];
  
  const questions = [
    {
      type: "multiple-choice",
      question: "Câu 1: 'Hello' trong Tiếng Việt nghĩa là gì?",
      options: ["Xin chào", "Tạm biệt", "Cảm ơn"],
      correctAnswer: 0,
      explanation: "'Hello' có nghĩa là 'Xin chào' trong Tiếng Việt"
    },
    {
      type: "multiple-choice",
      question: "Câu 2: 'Apple' là loại quả gì?",
      options: ["Cam", "Táo", "Chuối"],
      correctAnswer: 1,
      explanation: "'Apple' có nghĩa là 'Táo'"
    },
    {
      type: "fill-blank",
      question: "Câu 3: Điền từ còn thiếu: 'I __ a student'",
      correctAnswer: "am",
      explanation: "Câu đúng là 'I am a student'"
    },
    {
      type: "word-order",
      question: "Câu 4: Sắp xếp các từ sau thành câu đúng",
      words: ["like", "I", "apples"],
      correctOrder: [1, 0, 2],
      correctAnswer: "I like apples",
      explanation: "Câu đúng là 'I like apples'"
    },
    {
      type: "matching",
      question: "Câu 5: Ghép các từ Tiếng Anh với nghĩa Tiếng Việt tương ứng",
      pairs: [
        { english: "Hello", vietnamese: "Xin chào" },
        { english: "Goodbye", vietnamese: "Tạm biệt" },
        { english: "Thank you", vietnamese: "Cảm ơn" },
        { english: "Apple", vietnamese: "Táo" }
      ],
      explanation: "Các cặp từ tương ứng: Hello - Xin chào, Goodbye - Tạm biệt, Thank you - Cảm ơn, Apple - Táo"
    },
    {
      type: "word-order",
      question: "Câu 6: Sắp xếp các từ sau thành câu đúng",
      words: ["subject", "The", "is", "English", "best"],
      correctOrder: [1, 4, 0, 2, 3],
      correctAnswer: "The best subject is English",
      explanation: "Câu đúng là 'The best subject is English'"
    }
  ];
  
  // ========== CÁC HÀM XỬ LÝ TRANG ==========
  function showPage(pageId) {
    if (currentPage === pageId) return;
  
    const newPage = document.getElementById(pageId);
    if (!newPage) {
      console.error("Trang không tồn tại:", pageId);
      return;
    }
  
    // Ẩn trang hiện tại
    if (currentPage) {
      const oldPage = document.getElementById(currentPage);
      oldPage.classList.add('page-hidden');
    }
  
    // Hiển thị trang mới
    newPage.classList.remove('page-hidden');
    currentPage = pageId;
  
    // Xử lý đặc biệt cho từng trang
    switch(pageId) {
      case PAGES.STUDY:
        initStudyPage();
        break;
      case PAGES.SUMMARY:
        updateSummaryData();
        break;
      case PAGES.COURSE:
        renderCourseCards();
        break;
    }
  
    window.scrollTo(0, 0);
  }
  
  function initStudyPage() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    loadQuestion();
  }
  
  // ========== CÁC HÀM XỬ LÝ HỌC TẬP ==========
  function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
      showFinalResult();
      return;
    }
  
    const question = questions[currentQuestionIndex];
    const optionsContainer = document.getElementById('optionsContainer');
    
    optionsContainer.innerHTML = '';
    document.getElementById('currentQuestionNum').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = questions.length;
    document.getElementById('questionText').textContent = question.question;
    
    switch(question.type) {
      case 'multiple-choice':
        renderMultipleChoice(question, optionsContainer);
        break;
      case 'fill-blank':
        renderFillBlank(question, optionsContainer);
        break;
      case 'word-order':
        renderWordOrder(question, optionsContainer);
        break;
      case 'listen-select':
        renderListenSelect(question, optionsContainer);
        break;
      case 'matching':
        renderMatching(question, optionsContainer);
        break;
    }
    document.getElementById('checkAnswerBtn').addEventListener('click', checkAnswer);
    document.getElementById('nextQuestionBtn').addEventListener('click', nextQuestion);
    resetQuestionState();
  }
  
  function renderMultipleChoice(question, container) {
    question.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'option-btn';
      button.innerHTML = `
        <span class="option-letter">${String.fromCharCode(65 + index)}.</span>
        <span class="option-text">${option}</span>
      `;
      button.onclick = () => selectAnswer(button, index);
      container.appendChild(button);
    });
  }
  
  function renderFillBlank(question, container) {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'fillBlankInput';
    input.className = 'input-field';
    input.placeholder = 'Nhập câu trả lời của bạn';
    input.addEventListener('input', (e) => {
      document.getElementById('checkAnswerBtn').disabled = !e.target.value.trim();
      currentSelectedAnswer = e.target.value.trim().toLowerCase();
    });
    container.appendChild(input);
  }
  
  function renderWordOrder(question, container) {
    const wordBank = document.createElement('div');
    wordBank.className = 'word-bank';
    
    question.words.forEach((word, index) => {
      const wordElement = document.createElement('span');
      wordElement.className = 'word';
      wordElement.textContent = word;
      wordElement.draggable = true;
      wordElement.dataset.index = index;
      wordBank.appendChild(wordElement);
    });
    
    const sentenceArea = document.createElement('div');
    sentenceArea.className = 'sentence-container';
    sentenceArea.id = 'sentenceContainer';
    
    container.appendChild(wordBank);
    container.appendChild(sentenceArea);
    setupDragAndDrop();
  }
  
  function renderListenSelect(question, container) {
    const audioPlayer = document.createElement('div');
    audioPlayer.innerHTML = `
      <button class="audio-button" onclick="playQuestionAudio('${question.audio}')">
        <i class="fas fa-volume-up"></i> Phát âm thanh
      </button>
      <p class="audio-hint">Nhấn nút trên để nghe từ</p>
    `;
    container.appendChild(audioPlayer);
    
    question.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'option-btn';
      button.innerHTML = `
        <span class="option-letter">${String.fromCharCode(65 + index)}.</span>
        <span class="option-text">${option}</span>
      `;
      button.onclick = () => selectAnswer(button, index);
      container.appendChild(button);
    });
  }
  
  function renderMatching(question, container) {
    container.innerHTML = '';
    currentPairs = {};
    colorIndex = 0;
    
    const matchingContainer = document.createElement('div');
    matchingContainer.className = 'matching-game-container';
    
    const instructions = document.createElement('p');
    instructions.className = 'matching-instructions';
    instructions.textContent = 'Chọn 1 từ tiếng Anh và 1 từ tiếng Việt tương ứng để tạo thành cặp';
    matchingContainer.appendChild(instructions);
    
    const columns = document.createElement('div');
    columns.className = 'matching-columns';
    
    const englishColumn = document.createElement('div');
    englishColumn.className = 'matching-column english-column';
    englishColumn.innerHTML = '<h3>Tiếng Anh</h3>';
    
    const vietnameseColumn = document.createElement('div');
    vietnameseColumn.className = 'matching-column vietnamese-column';
    vietnameseColumn.innerHTML = '<h3>Tiếng Việt</h3>';
    
    question.pairs.forEach((pair, index) => {
      const engWord = document.createElement('div');
      engWord.className = 'matching-word';
      engWord.textContent = pair.english;
      engWord.dataset.pairIndex = index;
      engWord.dataset.type = 'english';
      englishColumn.appendChild(engWord);
    });
    
    const shuffledVietnamese = [...question.pairs].sort(() => Math.random() - 0.5);
    shuffledVietnamese.forEach(pair => {
      const vieWord = document.createElement('div');
      vieWord.className = 'matching-word';
      vieWord.textContent = pair.vietnamese;
      vieWord.dataset.pairIndex = question.pairs.indexOf(pair);
      vieWord.dataset.type = 'vietnamese';
      vietnameseColumn.appendChild(vieWord);
    });
    
    columns.appendChild(englishColumn);
    columns.appendChild(vietnameseColumn);
    matchingContainer.appendChild(columns);
    container.appendChild(matchingContainer);
    
    setupMatchingSelection();
  }
  
  function setupMatchingSelection() {
    const words = document.querySelectorAll('.matching-word');
    let firstSelected = null;
    
    words.forEach(word => {
      word.addEventListener('click', function() {
        if (this.classList.contains('matched')) return;
        
        if (!firstSelected) {
          firstSelected = this;
          this.classList.add('selected');
          return;
        }
        
        if (firstSelected.dataset.type === this.dataset.type) {
          firstSelected.classList.remove('selected');
          firstSelected = this;
          this.classList.add('selected');
          return;
        }
        
        const color = pairColors[colorIndex % pairColors.length];
        colorIndex++;
        
        firstSelected.style.backgroundColor = color;
        this.style.backgroundColor = color;
        
        const pairId = `pair-${colorIndex}`;
        currentPairs[pairId] = {
          word1: firstSelected,
          word2: this,
          color: color
        };
        
        firstSelected.classList.add('paired');
        this.classList.add('paired');
        
        firstSelected.classList.remove('selected');
        this.classList.remove('selected');
        firstSelected = null;
        
        const allPaired = document.querySelectorAll('.matching-word.paired').length === 
                         document.querySelectorAll('.matching-word').length;
        document.getElementById('checkAnswerBtn').disabled = !allPaired;
      });
    });
  }
  
  function checkAnswer() {
    const question = questions[currentQuestionIndex];
    let isCorrect = false;
    let feedbackText = '';
    
    switch(question.type) {
      case 'multiple-choice':
        isCorrect = parseInt(currentSelectedAnswer) === question.correctAnswer;
        feedbackText = isCorrect 
          ? "Chính xác! " + question.explanation
          : `Sai rồi! Đáp án đúng là: ${question.options[question.correctAnswer]}. ${question.explanation}`;
        break;
      case 'fill-blank':
        isCorrect = currentSelectedAnswer === question.correctAnswer.toLowerCase();
        feedbackText = isCorrect
          ? "Chính xác! " + question.explanation
          : `Sai rồi! Đáp án đúng là: "${question.correctAnswer}". ${question.explanation}`;
        break;
      case 'word-order':
        const selectedWords = Array.from(document.querySelectorAll('#sentenceContainer .word'))
          .map(word => word.textContent).join(' ');
        isCorrect = selectedWords === question.correctAnswer;
        feedbackText = isCorrect
          ? "Chính xác! " + question.explanation
          : `Sai rồi! Câu đúng là: "${question.correctAnswer}". ${question.explanation}`;
        break;
      case 'listen-select':
        isCorrect = currentSelectedAnswer === question.correctAnswer;
        feedbackText = isCorrect
          ? "Chính xác! " + question.explanation
          : `Sai rồi! Bạn vừa nghe từ "${question.options[question.correctAnswer]}". ${question.explanation}`;
        break;
      case 'matching':
        isCorrect = checkMatchingAnswer(question);
        feedbackText = isCorrect
          ? "Chính xác! " + question.explanation
          : "Sai rồi! " + question.explanation;
        break;
    }
    
    showFeedback(isCorrect, feedbackText);
    
    if (isCorrect) score++;
    document.getElementById('checkAnswerBtn').style.display = 'none';
    document.getElementById('nextQuestionBtn').style.display = 'inline-block';
  
    userAnswers[currentQuestionIndex] = {
      question: question.question,
      userAnswer: currentSelectedAnswer,
      isCorrect: isCorrect,
      explanation: question.explanation
    };
  }
  
  function checkMatchingAnswer(question) {
    let correctCount = 0;
    
    Object.values(currentPairs).forEach(pair => {
      const isCorrect = pair.word1.dataset.pairIndex === pair.word2.dataset.pairIndex;
      
      if (isCorrect) {
        correctCount++;
        pair.word1.classList.add('correct', 'matched');
        pair.word2.classList.add('correct', 'matched');
      } else {
        pair.word1.classList.add('incorrect');
        pair.word2.classList.add('incorrect');
      }
      
      pair.word1.classList.remove('paired');
      pair.word2.classList.remove('paired');
    });
    
    const totalPairs = question.pairs.length;
    const isPerfect = correctCount === totalPairs;
    
    score += correctCount;
    return isPerfect;
  }
  
  function showFeedback(isCorrect, text) {
    document.getElementById('correctIcon').style.display = isCorrect ? 'inline-block' : 'none';
    document.getElementById('wrongIcon').style.display = isCorrect ? 'none' : 'inline-block';
    document.getElementById('feedbackText').textContent = text;
    document.getElementById('resultFeedback').style.display = 'block';
  }
  
  function nextQuestion() {
    resetQuestionState();
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showFinalResult();
    }
  }
  
  function showFinalResult() {
    document.getElementById('questionText').textContent = "Hoàn thành bài học!";
    document.getElementById('optionsContainer').innerHTML = `
      <div class="result-summary">
        <h3>Kết quả của bạn</h3>
        <p>Bạn đã trả lời đúng ${score}/${questions.length} câu hỏi</p>
        <div class="progress-bar">
          <div class="progress" style="width: ${(score/questions.length)*100}%"></div>
        </div>
        <button class="button" onclick="restartQuiz()">Làm lại</button>
        <button class="button" onclick="showFullanswer()">Xem lại bài</button>
      </div>
    `;
  }
  
  function showFullanswer() {
    document.getElementById('optionsContainer').innerHTML = '';
    
    let fullReviewHTML = '<div class="full-review-container"><h3>Bài làm của bạn</h3>';
    
    questions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      fullReviewHTML += `
        <div class="review-question ${userAnswer?.isCorrect ? 'correct' : 'incorrect'}">
          <h4>Câu ${index + 1}: ${question.question}</h4>
          <div class="review-answer">
      `;
      
      switch(question.type) {
        case 'multiple-choice':
          const selectedOption = question.options[userAnswer?.userAnswer] || 'Không trả lời';
          const correctOption = question.options[question.correctAnswer];
          fullReviewHTML += `
            <p>Bạn chọn: <strong class="user-answer">${selectedOption}</strong></p>
            <p>Đáp án đúng: <strong class="correct-answer">${correctOption}</strong></p>
          `;
          break;
          
        case 'fill-blank':
          const userInput = userAnswer?.userAnswer || 'Không trả lời';
          fullReviewHTML += `
            <p>Bạn điền: <strong class="user-answer">${userInput}</strong></p>
            <p>Đáp án đúng: <strong class="correct-answer">${question.correctAnswer}</strong></p>
          `;
          break;
          
        case 'word-order':
          const userOrder = userAnswer?.userAnswer || 'Không sắp xếp';
          fullReviewHTML += `
            <p>Bạn sắp xếp: <strong class="user-answer">${userOrder}</strong></p>
            <p>Câu đúng: <strong class="correct-answer">${question.correctAnswer}</strong></p>
          `;
          break;
          
        case 'matching':
          fullReviewHTML += `<div class="user-pairs"><p>Các cặp bạn ghép:</p>`;
          // Hiển thị các cặp người dùng đã ghép
          fullReviewHTML += `</div>
            <div class="correct-pairs"><p>Các cặp đúng:</p>`;
          question.pairs.forEach(pair => {
            fullReviewHTML += `<div class="pair-item">${pair.english} ⇨ ${pair.vietnamese}</div>`;
          });
          fullReviewHTML += `</div>`;
          break;
      }
      
      fullReviewHTML += `
            <div class="explanation">${question.explanation}</div>
          </div>
        </div>
      `;
    });
    
    fullReviewHTML += `
      <div class="review-buttons">
        <button class="button" onclick="restartQuiz()">Làm lại</button>
        <button class="button secondary" onclick="showFinalResult()">Quay lại kết quả</button>
      </div>
    </div>
    `;
    
    document.getElementById('optionsContainer').innerHTML = fullReviewHTML;
  }
  
  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    loadQuestion();
  }
  
  function resetQuestionState() {
    document.getElementById('checkAnswerBtn').disabled = true;
    document.getElementById('checkAnswerBtn').style.display = 'inline-block';
    document.getElementById('nextQuestionBtn').style.display = 'none';
    document.getElementById('resultFeedback').style.display = 'none';
    document.getElementById('correctIcon').style.display = 'none';
    document.getElementById('wrongIcon').style.display = 'none';
    currentSelectedAnswer = null;
  }
  
  function selectAnswer(button, answerIndex) {
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.classList.remove('selected');
    });
    
    button.classList.add('selected');
    currentSelectedAnswer = answerIndex;
    document.getElementById('checkAnswerBtn').disabled = false;
  }
  
  function setupDragAndDrop() {
    const words = document.querySelectorAll('.word');
    const sentenceContainer = document.getElementById('sentenceContainer');
    
    words.forEach(word => {
      word.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', this.dataset.index);
      });
    });
    
    sentenceContainer.addEventListener('dragover', function(e) {
      e.preventDefault();
      this.style.backgroundColor = 'var(--primary-light)';
    });
    
    sentenceContainer.addEventListener('dragleave', function() {
      this.style.backgroundColor = 'white';
    });
    
    sentenceContainer.addEventListener('drop', function(e) {
      e.preventDefault();
      this.style.backgroundColor = 'white';
      const index = e.dataTransfer.getData('text/plain');
      const word = document.querySelector(`.word[data-index="${index}"]`);
      
      if (word && !Array.from(this.children).includes(word)) {
        this.appendChild(word);
        document.getElementById('checkAnswerBtn').disabled = false;
      }
    });
  }
  
  function playQuestionAudio(audioFile) {
    try {
      const audio = new Audio(audioFile);
      audio.play().catch(e => {
        console.error("Lỗi phát âm thanh:", e);
        showAudioError();
      });
      
      const button = document.querySelector('.audio-button');
      button.classList.add('playing');
      setTimeout(() => button.classList.remove('playing'), 1000);
    } catch (e) {
      console.error("Lỗi tải file âm thanh:", e);
      showAudioError();
    }
  }
  
  function showAudioError() {
    const feedback = document.getElementById('resultFeedback');
    feedback.style.display = 'block';
    feedback.innerHTML = `
      <i class="fas fa-exclamation-triangle" style="color: orange;"></i>
      <p>Không thể phát âm thanh. Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
    `;
  }
  
  // ========== CÁC HÀM XỬ LÝ KHÁC ==========
  function startLearning() {
    showPage(PAGES.LEVEL);
  }
  
  function updateProgress() {
    const selectedLevel = document.querySelector('input[name="level"]:checked');
    if (selectedLevel) {
      localStorage.setItem('level', selectedLevel.value);
      document.getElementById('userLevel').textContent = getLevelText(selectedLevel.value);
    }
    showPage(PAGES.MOTIVATION);
  }
  
  function proceedToGoal() {
    const selectedMotivation = document.querySelector('input[name="motivation"]:checked');
    if (selectedMotivation) {
      if (selectedMotivation.value === 'other') {
        const otherText = document.getElementById('otherMotivation').value;
        localStorage.setItem('otherMotivation', otherText);
      }
      localStorage.setItem('motivation', selectedMotivation.value);
    }
    showPage(PAGES.GOAL);
  }
  
  function setDailyGoal(minutes) {
    localStorage.setItem('dailyGoal', minutes);
    document.getElementById('userGoal').textContent = `${minutes} phút/ngày`;
    updateSummaryData();
    showPage(PAGES.SUMMARY);
  }
  
  function updateSummaryData() {
    const level = localStorage.getItem('level');
    const motivation = localStorage.getItem('motivation');
    const goal = localStorage.getItem('dailyGoal');
    const otherMotivation = localStorage.getItem('otherMotivation');
  
    document.getElementById('summaryLevel').textContent = getLevelText(level);
    
    if (motivation === 'other') {
      document.getElementById('summaryMotivation').textContent = otherMotivation || 'Khác';
    } else {
      document.getElementById('summaryMotivation').textContent = getMotivationText(motivation);
    }
    
    document.getElementById('summaryGoal').textContent = goal ? `${goal} phút/ngày` : 'Chưa đặt';
  }
  
  function proceedToAchievement() {
    showPage(PAGES.ACHIEVEMENT);
  }
  
  function editSelections() {
    showPage(PAGES.LEVEL);
  }
  
  function proceedToProfile() {
    showPage(PAGES.PROFILE);
  }
  
  function startLearningNow() {
    showPage(PAGES.STUDY);
  }
  
  function saveProfileAndContinue() {
    const fullName = document.getElementById('fullName').value.trim();
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value.trim();
    let isValid = true;

     
  
    if (!fullName) {
      isValid = showError('nameError', 'Vui lòng nhập họ và tên');
    } else {
      hideError('nameError');
    }
  
    if (!age || age < 5 || age > 100) {
      isValid = showError('ageError', 'Vui lòng nhập tuổi hợp lệ (5-100)');
    } else {
      hideError('ageError');
    }
  
    if (email && !validateEmail(email)) {
      isValid = showError('emailError', 'Vui lòng nhập email hợp lệ');
    } else {
      hideError('emailError');
    }
  
    if (!isValid) return;
  
    if (userAvatar) {
      localStorage.setItem('userAvatar', userAvatar);
      displayUserAvatar(userAvatar);
    }
    // kiem tra quyen admin
    const isAdmin = fullName === "Zakhanh_admin";
    localStorage.setItem('isAdmin', isAdmin);
    currentState.isAdmin = isAdmin;

    localStorage.setItem('fullName', fullName);
    localStorage.setItem('age', age);
    localStorage.setItem('email', email || '');
    displayUserInfo();
    showPage(PAGES.COMPLETE);
  }
  
  function displayUserInfo() {
    const userName = document.getElementById('userName');
    const userAge = document.getElementById('userAge');
    const userEmail = document.getElementById('userEmail');
    const userLevel = document.getElementById('userLevel');
    const userGoal = document.getElementById('userGoal');
  
    const name = localStorage.getItem('fullName') || 'Khách';
    const age = localStorage.getItem('age') || 'Chưa cung cấp';
    const email = localStorage.getItem('email') || 'Chưa cung cấp';
    const level = localStorage.getItem('level') || 'Chưa chọn';
    const goal = localStorage.getItem('dailyGoal') ? `${localStorage.getItem('dailyGoal')} phút/ngày` : 'Chưa đặt';
  
    userName.textContent = name;
    userAge.textContent = age;
    userEmail.textContent = email;
    userLevel.textContent = getLevelText(level);
    userGoal.textContent = goal;
  
    if (name !== 'Khách') {
      document.getElementById('fullName').value = name;
      document.getElementById('age').value = age;
      document.getElementById('email').value = email === 'Chưa cung cấp' ? '' : email;
    }
    
    if (localStorage.getItem('userAvatar')) {
      displayUserAvatar(localStorage.getItem('userAvatar'));
    }
     // Kiểm tra và cập nhật quyền admin khi tải trang
  const savedAdmin = localStorage.getItem('isAdmin') === 'true';
  currentState.isAdmin = savedAdmin;

  const adminBadge = document.getElementById('adminBadge');
  if (currentState.isAdmin) {
    adminBadge.style.display = 'inline-block';
  } else {
    adminBadge.style.display = 'none';
  }
  // hien thị khoá học dã mua
  displayPurchasedCourses();
  }
  
  function getLevelText(level) {
    const levels = {
      'beginner': 'Mới bắt đầu',
      'elementary': 'Cơ bản',
      'intermediate': 'Trung cấp',
      'advanced': 'Nâng cao',
      'proficient': 'Thành thạo'
    };
    return levels[level] || level;
  }
  
  function getMotivationText(motivation) {
    const motivations = {
      'travel': 'Chuẩn bị đi du lịch',
      'productivity': 'Sử dụng thời gian hiệu quả',
      'connection': 'Kết nối với mọi người',
      'fun': 'Giải trí',
      'study': 'Hỗ trợ việc học tập',
      'career': 'Phát triển sự nghiệp',
      'other': 'Khác'
    };
    return motivations[motivation] || motivation;
  }
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
  
  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    return false;
  }
  
  function hideError(elementId) {
    document.getElementById(elementId).style.display = 'none';
    return true;
  }
  
  function displayUserAvatar(avatarData) {
    // Hiển thị trong form
    const preview = document.getElementById('avatarPreview');
    if (preview) {
      preview.innerHTML = `<img src="${avatarData}" alt="Avatar">`;
      preview.style.display = 'block';
    }
    
    // Hiển thị trên sidebar (góc trên bên phải)
    let avatarElement = document.querySelector('.user-avatar-sidebar');
    if (!avatarElement) {
      avatarElement = document.createElement('div');
      avatarElement.className = 'user-avatar-sidebar';
      avatarElement.style.position = 'fixed';
      avatarElement.style.top = '20px';
      avatarElement.style.right = '20px';
      avatarElement.style.width = '80px';
      avatarElement.style.height = '80px';
      avatarElement.style.borderRadius = '50%';
      avatarElement.style.border = '2px solid white';
      avatarElement.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      avatarElement.style.overflow = 'hidden';
      avatarElement.style.zIndex = '1000';
      document.body.appendChild(avatarElement);
    }
    avatarElement.innerHTML = `<img src="${avatarData}" alt="User Avatar" style="width:100%;height:100%;object-fit:cover;">`;
  }
  
  // ========== XỬ LÝ KHOÁ HỌC ==========
  window.courseDetails = {
    1: {
      id: 1,
      title: "Tiếng Anh Giao Tiếp Cơ Bản",
      price: 1299000,
      originalPrice: 1799000,
      duration: "3 tháng",
      lessons: "30 bài học",
      description: "Khóa học giúp bạn tự tin giao tiếp tiếng Anh trong các tình huống hàng ngày.",
      features: [
        "30 bài học video chất lượng cao",
        "100+ tình huống giao tiếp thực tế",
        "Giáo viên bản ngữ giàu kinh nghiệm",
        "Hỗ trợ 24/7 từ đội ngũ trợ giảng"
      ],
      image: "https://think.edu.vn/wp-content/uploads/2023/09/du-hoc-my-can-bang-tieng-anh-gi.jpg",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      badge: "BEST SELLER"
    },
    2: {
      id: 2,
      title: "Tiếng Anh Cho Người Đi Làm",
      price: 1599000,
      duration: "4 tháng",
      lessons: "45 bài học",
      description: "Nâng cao kỹ năng tiếng Anh chuyên nghiệp cho môi trường công sở.",
      features: [
        "45 bài học chuyên sâu",
        "Kỹ năng viết email chuyên nghiệp",
        "Thuyết trình và đàm phán bằng tiếng Anh",
        "Case study thực tế từ doanh nghiệp"
      ],
      image: "https://img.freepik.com/free-vector/business-people-speaking-different-languages_74855-5282.jpg",
      gradient: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
      badge: "NEW"
    },
    3: {
      id: 3,
      title: "Luyện Thi IELTS 6.5+",
      price: 2499000,
      duration: "6 tháng",
      lessons: "60 bài học",
      description: "Chương trình luyện thi IELTS toàn diện 4 kỹ năng với giáo viên 8.5 IELTS.",
      features: [
        "60 bài học toàn diện 4 kỹ năng",
        "10 bài test thực hành mô phỏng",
        "Giáo viên 8.5 IELTS kinh nghiệm",
        "Cam kết đầu ra 6.5+"
      ],
      image: "https://s3.ap-southeast-1.amazonaws.com/sansangduhoc.vn/wp-content/uploads/2021/10/20-tu-moi-chi-hoat-dong-trong-ngay.jpg",
      gradient: "linear-gradient(135deg, #5f72bd 0%, #9b59b6 100%)"
    }
  };
  
  let currentState = {
    currentPage: null,
    isAdmin: true,
    currentPayment: {
      courseId: null,
      method: 'momo'
    },
    editingCourseId: null
  };
  
  function renderCourseCards() {
    const courseGrid = document.querySelector('.course-grid');
    if (!courseGrid) return;
    
    courseGrid.innerHTML = '';
    
    

    Object.values(courseDetails).forEach(course => {
      const courseCard = document.createElement('div');
      courseCard.className = 'course-card';
      
      courseCard.innerHTML = `
      

      ${currentState.isAdmin ? `
        <div class="admin-controls">
          <button class="edit-course-btn" onclick="openEditModal(${course.id}, event)">
            <i class="fas fa-edit"></i>
          </button>
        </div>` : ''}

        ${currentState.isAdmin ? `
        <div class="admin-controls">
          <button class="edit-course-btn" onclick="openEditModal(${course.id}, event)">
            <i class="fas fa-edit"></i>
          </button>
        </div>` : ''}
        
        ${course.badge ? `<div class="course-badge">${course.badge}</div>` : ''}
        
        <div class="course-header" style="background: ${course.gradient}">
          <h3>${course.title}</h3>
          <div class="course-price">
            ${course.originalPrice ? `
              ${formatPrice(course.price)} 
              <span class="original-price">${formatPrice(course.originalPrice)}</span>
            ` : formatPrice(course.price)}
          </div>
        </div>
        
        <div class="course-content">
          <ul class="course-features">
            ${course.features.slice(0, 4).map(f => `
              <li><i class="fas fa-check"></i> ${f}</li>
            `).join('')}
          </ul>
        </div>
        
        <div class="course-footer">
          <button class="course-button" onclick="buyCourse(${course.id})">
            Mua ngay
          </button>
          <button class="course-button outline" onclick="viewDetails(${course.id})">
            Chi tiết
          </button>
        </div>
      `;
      
      courseGrid.appendChild(courseCard);
    });
    
    if (isAdmin) {
      const addCourseCard = document.createElement('div');
      addCourseCard.className = 'course-card add-new-course';
      addCourseCard.innerHTML = `
        <div class="course-header" style="background: linear-gradient(135deg, #9b59b6, #5f72bd)">
          <h3>+ Thêm khoá học mới</h3>
        </div>
        <div class="course-content">
          <p>Nhấn để thêm khoá học mới vào hệ thống</p>
        </div>
      `;
      addCourseCard.onclick = () => openEditModal('new');
      courseGrid.appendChild(addCourseCard);
    }
    if (currentState.isAdmin) {
      const addCourseCard = document.createElement('div');
      addCourseCard.className = 'course-card add-new-course';
      // ... (giữ nguyên phần HTML của thẻ)
      courseGrid.appendChild(addCourseCard);
    }
  
  }
  
  function buyCourse(courseId) {
    const course = courseDetails[courseId];
    if (!course) return;
    
    currentState.currentPayment.courseId = courseId;
    
    document.getElementById('paymentCourseTitle').textContent = course.title;
    document.getElementById('paymentCourseName').textContent = course.title;
    document.getElementById('paymentCoursePrice').textContent = formatPrice(course.price);
    document.getElementById('paymentTotal').textContent = formatPrice(course.price);
    
    openModal('paymentModal');
  }
  
  function viewDetails(courseId) {
    const course = courseDetails[courseId];
    if (!course) return;
    
    const detailContent = document.getElementById('courseDetailContent');
    detailContent.innerHTML = `
      <div class="course-detail-header">
        <h2>${course.title}</h2>
        ${course.originalPrice ? `
          <p class="course-price">
            ${formatPrice(course.price)} 
            <span class="original-price">${formatPrice(course.originalPrice)}</span>
          </p>
        ` : `
          <p class="course-price">${formatPrice(course.price)}</p>
        `}
      </div>
      
      <div class="course-detail-content">
        <div class="course-detail-left">
          <img src="${course.image}" alt="${course.title}" class="course-image">
          <h3>Mô tả khóa học</h3>
          <p>${course.description}</p>
          
          <h3>Nội dung khóa học</h3>
          <ul class="course-features">
            ${course.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
          </ul>
        </div>
        
        <div class="course-detail-right">
          <div class="course-info-box">
            <h4>Thông tin khóa học</h4>
            <p><i class="far fa-clock"></i> <strong>Thời lượng:</strong> ${course.duration}</p>
            <p><i class="fas fa-book"></i> <strong>Số bài học:</strong> ${course.lessons}</p>
            <p><i class="fas fa-chalkboard-teacher"></i> <strong>Giảng viên:</strong> Đội ngũ chuyên gia</p>
            <p><i class="fas fa-certificate"></i> <strong>Chứng chỉ:</strong> Có</p>
            
            <button class="button full-width" onclick="buyCourse(${course.id})">
              <i class="fas fa-shopping-cart"></i> Đăng ký ngay
            </button>
            
            ${currentState.isAdmin ? `
            <button class="button outline full-width" onclick="openEditModal(${course.id})">
              <i class="fas fa-edit"></i> Chỉnh sửa khóa học
            </button>` : ''}
          </div>
        </div>
      </div>
    `;
    
    openModal('courseDetailModal');
  }
  
  function openEditModal(courseId, event) {
    if (event) event.stopPropagation();
    
    const course = courseDetails[courseId];
    
    if (!course) return;
    
    currentState.editingCourseId = courseId;
    
    document.getElementById('editCourseTitle').value = course.title;
    document.getElementById('editCoursePrice').value = course.price;
    document.getElementById('editOriginalPrice').value = course.originalPrice || '';
    document.getElementById('editCourseDuration').value = course.duration;
    document.getElementById('editCourseLessons').value = course.lessons;
    document.getElementById('editCourseDescription').value = course.description;
    document.getElementById('editCourseImage').value = course.image;
    document.getElementById('editCourseFeatures').value = course.features.join('\n');
    
    openModal('editCourseModal');
 
  }
  
  function saveCourseChanges() {
    const courseId = currentState.editingCourseId;
    if (!courseId) return;
    
    const title = document.getElementById('editCourseTitle').value.trim();
    const price = parseInt(document.getElementById('editCoursePrice').value);
    const originalPrice = document.getElementById('editOriginalPrice').value.trim();
    const duration = document.getElementById('editCourseDuration').value.trim();
    const lessons = document.getElementById('editCourseLessons').value.trim();
    const description = document.getElementById('editCourseDescription').value.trim();
    const image = document.getElementById('editCourseImage').value.trim();
    const features = document.getElementById('editCourseFeatures').value
      .split('\n')
      .map(f => f.trim())
      .filter(f => f !== '');
  
    if (!title || isNaN(price) || !duration || !lessons || !description || !image || features.length === 0) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }
  
    courseDetails[courseId] = {
      ...courseDetails[courseId],
      title,
      price,
      originalPrice: originalPrice ? parseInt(originalPrice) : undefined,
      duration,
      lessons,
      description,
      image,
      features
    };
    
    renderCourseCards();
    closeModal('editCourseModal');
    alert('Cập nhật khóa học thành công!');
  }
  
  function selectPayment(element, method) {
    document.querySelectorAll('.payment-option').forEach(opt => {
      opt.classList.remove('selected');
    });
    element.classList.add('selected');
    currentState.currentPayment.method = method;
  }
  
  function processPayment() {
    const { courseId, method } = currentState.currentPayment;
    const course = courseDetails[courseId];
    
    if (!course) {
      alert('Lỗi: Không tìm thấy khóa học');
      return;
    }
    
    const payButton = document.querySelector('.payment-button');
    const originalText = payButton.innerHTML;
    payButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    payButton.disabled = true;
    
    setTimeout(() => {
      // them khoá học vào danh sách đã mua
      addPurchasedCourse(courseId);

      payButton.innerHTML = originalText;
      payButton.disabled = false;
      closeModal('paymentModal');
      alert(`Thanh toán thành công!\n\nKhóa học: ${course.title}\nSố tiền: ${formatPrice(course.price)}\nPhương thức: ${getPaymentMethodName(method)}`);
    }, 2000);
    
  }
  
  
  function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(price);
  }
  
  function getPaymentMethodName(method) {
    const methods = {
      'momo': 'Ví MoMo',
      'zalopay': 'ZaloPay',
      'bank': 'Chuyển khoản ngân hàng',
      'card': 'Thẻ Visa/Mastercard'
    };
    return methods[method] || method;
  }
  
  function openModal(modalId) {
    document.querySelectorAll('.modal').forEach(modal => {
      if (modal.id !== modalId) {
        modal.style.display = 'none';
      }
    });
    
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
      
      if (modalId === 'courseDetailModal' || modalId === 'editCourseModal') {
        modal.classList.add('large-modal');
      } else {
        modal.classList.remove('large-modal');
      }
    }
  }
  
  
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }
  function addPurchasedCourse(courseId) {
    // Lấy danh sách khoá học đã mua từ localStorage
    let purchasedCourses = JSON.parse(localStorage.getItem('purchasedCourses')) || [];
    
    // Nếu chưa mua khoá học này thì thêm vào
    if (!purchasedCourses.includes(courseId)) {
      purchasedCourses.push(courseId);
      localStorage.setItem('purchasedCourses', JSON.stringify(purchasedCourses));
    }
    
    // Cập nhật hiển thị
    displayPurchasedCourses();
  }
  function displayPurchasedCourses() {
    const listElement = document.getElementById('purchasedCoursesList');
    if (!listElement) return;
    
    listElement.innerHTML = '';
    
    const purchasedCourses = JSON.parse(localStorage.getItem('purchasedCourses')) || [];
    
    if (purchasedCourses.length === 0) {
      listElement.innerHTML = '<li>Bạn chưa mua khoá học nào</li>';
      return;
    }
    
    purchasedCourses.forEach(courseId => {
      const course = window.courseDetails[courseId];
      if (course) {
        const li = document.createElement('li');
        li.innerHTML = `
          <i class="fas fa-book"></i>
          <span>${course.title}</span>
        `;
        listElement.appendChild(li);
      }
    });
  }


  
  // ========== KHỞI TẠO và RESET ==========
  function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (!logoutBtn) return;
    
    logoutBtn.addEventListener('click', function() {
      if (confirm('Bạn có chắc muốn đăng xuất? Mọi thông tin sẽ được đặt lại.')) {
        resetUserData();
      }
    });
  }
  
 

  document.addEventListener('DOMContentLoaded', function() {
    // Avatar upload
    document.getElementById('avatarUpload')?.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          userAvatar = event.target.result;
          displayUserAvatar(userAvatar);
          localStorage.setItem('userAvatar', userAvatar);
        }
        reader.readAsDataURL(file);
      }
    });
  
    // Hiển thị thông tin nếu có
    if (localStorage.getItem('fullName')) {
      displayUserInfo();
    }
  
    // Load avatar nếu có
    if (localStorage.getItem('userAvatar')) {
      displayUserAvatar(localStorage.getItem('userAvatar'));
    }
  
    // Mặc định hiển thị trang chào mừng
    showPage(PAGES.WELCOME);
  
    // Xử lý click bên ngoài modal để đóng
    window.onclick = function(event) {
      if (event.target.classList.contains('modal')) {
        document.querySelectorAll('.modal').forEach(modal => {
          closeModal(modal.id);
        });
      }
    };
    displayPurchasedCourses();
    setupLogout();

  });
  function resetUserData() {
    // Xoá tất cả dữ liệu cá nhân
    localStorage.removeItem('fullName');
    localStorage.removeItem('age');
    localStorage.removeItem('email');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('isAdmin');
    
    // Xoa cả khoá học thì thêm dòng nè
    // localStorage.removeItem('purchasedCourses');
    
    // Reset giao diện
    document.getElementById('userName').textContent = 'Khách';
    document.getElementById('userAge').textContent = 'Chưa cung cấp';
    document.getElementById('userEmail').textContent = 'Chưa cung cấp';
    document.getElementById('userLevel').textContent = 'Chưa chọn';
    document.getElementById('userGoal').textContent = 'Chưa đặt';
    document.getElementById('adminBadge').style.display = 'none';
    
    // Reset avatar
    const avatarImg = document.querySelector('#userAvatar img');
    if (avatarImg) avatarImg.src = '';
    
    // Reset form profile
    document.getElementById('fullName').value = '';
    document.getElementById('age').value = '';
    document.getElementById('email').value = '';
    
    // Reset trạng thái admin
    currentState.isAdmin = false;
    
    // Ẩn các nút admin (nếu có)
    document.querySelectorAll('.admin-controls').forEach(el => el.style.display = 'none');
    
    // Hiển thị thông báo
    alert('Đã đăng xuất thành công!');
    showPage(PAGES.WELCOME);
  }