// course-management.js

window.openEditModal = function(courseId, event) {
    if (!currentState.isAdmin) {
        alert('Chỉ admin mới có quyền chỉnh sửa khoá học!');
        return;
      }
    if (event) event.stopPropagation();
    
    if (courseId === 'new') {
        openCreateCourseModal();
        return;
    }
    
    const course = window.courseDetails[courseId];
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

    const deleteBtn = document.getElementById('deleteCourseBtn');
    if (courseId === 'new') {
      deleteBtn.style.display = 'none';
    } else {
      deleteBtn.style.display = 'inline-block';
    }
};
document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra và khởi tạo courseDetails nếu chưa có
    if (!window.courseDetails) {
        window.courseDetails = {};
    }

    // Hàm mở modal tạo khóa học
    window.openCreateCourseModal = function() {
        // Reset form
        document.getElementById('newCourseTitle').value = '';
        document.getElementById('newCoursePrice').value = '';
        document.getElementById('newOriginalPrice').value = '';
        document.getElementById('newCourseDuration').value = '3 tháng';
        document.getElementById('newCourseLessons').value = '30 bài học';
        document.getElementById('newCourseDescription').value = '';
        document.getElementById('newCourseImage').value = 'https://img.freepik.com/free-vector/online-tutorials-concept_23-2148523298.jpg';
        document.getElementById('newCourseGradient').value = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
        document.getElementById('newCourseFeatures').value = '30 bài học video\nGiáo viên bản ngữ\nHỗ trợ 24/7\nTài liệu miễn phí';
        
        openModal('createCourseModal');
    };

    // Hàm tạo khóa học mới
    window.createNewCourse = function() {
        const title = document.getElementById('newCourseTitle').value.trim();
        const price = parseInt(document.getElementById('newCoursePrice').value);
        const originalPrice = document.getElementById('newOriginalPrice').value.trim();
        const duration = document.getElementById('newCourseDuration').value.trim();
        const lessons = document.getElementById('newCourseLessons').value.trim();
        const description = document.getElementById('newCourseDescription').value.trim();
        const image = document.getElementById('newCourseImage').value.trim();
        const gradient = document.getElementById('newCourseGradient').value.trim();
        const features = document.getElementById('newCourseFeatures').value
            .split('\n')
            .map(f => f.trim())
            .filter(f => f !== '');

        // Validate dữ liệu
        if (!title || isNaN(price) || !duration || !lessons || !description || !image || !gradient || features.length === 0) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        // Tạo ID mới
        const newId = Math.max(...Object.keys(courseDetails).map(Number)) + 1;
        
        // Thêm khóa học mới
        courseDetails[newId] = {
            id: newId,
            title,
            price,
            originalPrice: originalPrice ? parseInt(originalPrice) : undefined,
            duration,
            lessons,
            description,
            image,
            gradient,
            features,
            badge: "NEW"
        };
        
        // Render lại danh sách
        if (typeof renderCourseCards === 'function') {
            renderCourseCards();
        }
        
        // Đóng modal
        closeModal('createCourseModal');
        alert(`Đã tạo thành công khóa học: ${title}`);
    };

    // Gán sự kiện click cho nút thêm khóa học
    const addCourseBtn = document.querySelector('.add-new-course');
    if (addCourseBtn) {
        addCourseBtn.addEventListener('click', openCreateCourseModal);
    }
});

  // Hàm xác nhận xoá
  window.confirmDeleteCourse = function() {
    const courseId = currentState.editingCourseId;
    if (!courseId) return;
    
    const course = window.courseDetails[courseId];
    document.getElementById('deleteConfirmText').textContent = 
      `Bạn có chắc muốn xoá khoá học "${course.title}"? Thao tác này không thể hoàn tác!`;
    
    closeModal('editCourseModal');
    openModal('confirmDeleteModal');
  };
  
  // Hàm thực hiện xoá
  window.deleteCourse = function() {
    const courseId = currentState.editingCourseId;
    if (!courseId) return;
    
    // Xoá khỏi danh sách
    delete window.courseDetails[courseId];
    
    // Render lại danh sách
    if (typeof renderCourseCards === 'function') {
      renderCourseCards();
    }
    
    // Đóng modal và thông báo
    closeModal('confirmDeleteModal');
    alert('Đã xoá khoá học thành công!');
  };
  