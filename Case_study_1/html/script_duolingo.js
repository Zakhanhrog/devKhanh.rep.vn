
    function startLearning() {
    document.querySelector('.container').style.display = 'none';
    document.getElementById('levelPage').classList.remove('page-hidden');
}

    function updateProgress() {
    const selectedLevel = document.querySelector('input[name="level"]:checked');
    if (selectedLevel) {
    localStorage.setItem('level', selectedLevel.value);
    document.getElementById('levelPage').style.display = 'none';
    document.getElementById('motivationPage').classList.remove('page-hidden');
} else {
    alert('Vui lòng chọn trình độ của bạn!');
}
}

    function proceedToGoal() {
    const selectedMotivation = document.querySelector('input[name="motivation"]:checked');
    const otherMotivationInput = document.getElementById('otherMotivation');
    if (selectedMotivation) {
    let motivationValue = selectedMotivation.value;
    if (motivationValue === 'other') {
    const otherMotivation = otherMotivationInput.value.trim();
    if (otherMotivation === '') {
    alert('Vui lòng nhập lý do học của bạn!');
    return;
}
    motivationValue = otherMotivation;
}
    localStorage.setItem('motivation', motivationValue);
    document.getElementById('motivationPage').style.display = 'none';
    document.getElementById('goalPage').classList.remove('page-hidden');
} else {
    alert('Vui lòng chọn lý do học của bạn!');
}
}

    function setDailyGoal(minutes) {
    localStorage.setItem('dailyGoal', minutes);
    document.getElementById('goalPage').style.display = 'none';
    document.getElementById('summaryPage').classList.remove('page-hidden');
    displaySummary();
}

    function displaySummary() {
    const level = localStorage.getItem('level');
    const motivation = localStorage.getItem('motivation');
    const goal = localStorage.getItem('dailyGoal');
    document.getElementById('summaryLevel').textContent = level;
    document.getElementById('summaryMotivation').textContent = motivation;
    document.getElementById('summaryGoal').textContent = goal + ' phút';
}

    function proceedToAchievement() {
    document.getElementById('summaryPage').style.display = 'none';
    document.getElementById('achievementPage').classList.remove('page-hidden');
}

    function startLearningNow() {
    document.getElementById('achievementPage').style.display = 'none';
    document.getElementById('completePage').classList.remove('page-hidden');
    // window.location.href = 'learning.html';
}
