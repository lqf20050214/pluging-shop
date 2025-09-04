// 上传页面JavaScript逻辑

// 上传历史数据
let uploadHistory = [
    {
        id: 1,
        name: '自定义数据分析工具',
        version: '1.2.0',
        uploadDate: '2024-01-10',
        status: 'approved',
        downloads: 45
    },
    {
        id: 2,
        name: '智能清洗调度系统',
        version: '2.0.1',
        uploadDate: '2024-01-05',
        status: 'approved',
        downloads: 128
    },
    {
        id: 3,
        name: '储能优化策略',
        version: '1.5.3',
        uploadDate: '2024-01-01',
        status: 'pending',
        downloads: 0
    }
];

// 当前上传状态
let currentUploadState = {
    step: 1,
    progress: 0,
    isUploading: false
};

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    // 渲染上传历史
    renderUploadHistory();
    
    // 绑定事件监听器
    bindEventListeners();
    
    // 初始化拖拽上传
    initDragAndDrop();
});

// 绑定事件监听器
function bindEventListeners() {
    // 表单提交
    document.getElementById('uploadForm').addEventListener('submit', handleFormSubmit);
    
    // 文件选择
    document.getElementById('pluginFile').addEventListener('change', handleFileSelect);
    
    // 重置表单
    document.getElementById('uploadForm').addEventListener('reset', function() {
        resetFileInfo();
    });
}

// 初始化拖拽上传
function initDragAndDrop() {
    const uploadArea = document.getElementById('fileUploadArea');
    const fileInput = document.getElementById('pluginFile');
    
    // 拖拽事件
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            handleFileSelect();
        }
    });
    
    // 点击上传区域
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });
}

// 处理文件选择
function handleFileSelect() {
    const fileInput = document.getElementById('pluginFile');
    const file = fileInput.files[0];
    
    if (file) {
        // 验证文件类型
        const allowedTypes = ['.zip', '.tar.gz'];
        const fileName = file.name.toLowerCase();
        const isValidType = allowedTypes.some(type => fileName.endsWith(type));
        
        if (!isValidType) {
            showNotification('不支持的文件格式，请选择 .zip 或 .tar.gz 文件', 'error');
            resetFileInfo();
            return;
        }
        
        // 验证文件大小 (50MB)
        const maxSize = 50 * 1024 * 1024; // 50MB
        if (file.size > maxSize) {
            showNotification('文件大小超过限制，请选择小于 50MB 的文件', 'error');
            resetFileInfo();
            return;
        }
        
        // 显示文件信息
        showFileInfo(file);
    }
}

// 显示文件信息
function showFileInfo(file) {
    const fileInfo = document.getElementById('fileInfo');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const uploadArea = document.getElementById('fileUploadArea');
    
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    
    fileInfo.style.display = 'flex';
    uploadArea.style.display = 'none';
}

// 移除文件
function removeFile() {
    const fileInput = document.getElementById('pluginFile');
    const fileInfo = document.getElementById('fileInfo');
    const uploadArea = document.getElementById('fileUploadArea');
    
    fileInput.value = '';
    fileInfo.style.display = 'none';
    uploadArea.style.display = 'block';
}

// 重置文件信息
function resetFileInfo() {
    removeFile();
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 处理表单提交
function handleFormSubmit(event) {
    event.preventDefault();
    
    if (currentUploadState.isUploading) {
        return;
    }
    
    // 验证表单
    if (!validateForm()) {
        return;
    }
    
    // 开始上传
    startUpload();
}

// 验证表单
function validateForm() {
    const requiredFields = [
        'pluginName',
        'pluginVersion',
        'pluginDescription',
        'pluginCategory',
        'pluginLicense',
        'pluginVisibility',
        'pluginAuthor',
        'pluginFile'
    ];
    
    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            showNotification(`请填写 ${field.previousElementSibling.textContent.replace('*', '')}`, 'error');
            field.focus();
            return false;
        }
    }
    
    // 验证版本号格式
    const version = document.getElementById('pluginVersion').value;
    const versionPattern = /^\d+\.\d+\.\d+$/;
    if (!versionPattern.test(version)) {
        showNotification('版本号格式不正确，请使用 x.y.z 格式', 'error');
        document.getElementById('pluginVersion').focus();
        return false;
    }
    
    // 验证邮箱格式（如果填写了）
    const email = document.getElementById('pluginEmail').value;
    if (email && !isValidEmail(email)) {
        showNotification('邮箱格式不正确', 'error');
        document.getElementById('pluginEmail').focus();
        return false;
    }
    
    return true;
}

// 验证邮箱格式
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// 开始上传
function startUpload() {
    currentUploadState.isUploading = true;
    currentUploadState.step = 1;
    currentUploadState.progress = 0;
    
    // 显示上传进度模态框
    document.getElementById('uploadProgressModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // 开始上传流程
    simulateUpload();
}

// 模拟上传过程
function simulateUpload() {
    const steps = [
        { name: '文件验证', duration: 1000, progress: 25 },
        { name: '上传文件', duration: 2000, progress: 60 },
        { name: '处理中', duration: 1500, progress: 85 },
        { name: '完成', duration: 500, progress: 100 }
    ];
    
    let currentStep = 0;
    
    function processStep() {
        if (currentStep >= steps.length) {
            completeUpload();
            return;
        }
        
        const step = steps[currentStep];
        
        // 更新步骤状态
        updateStepStatus(currentStep + 1, 'active');
        updateProgressText(step.name);
        
        // 模拟进度
        const startProgress = currentStep === 0 ? 0 : steps[currentStep - 1].progress;
        const endProgress = step.progress;
        const progressStep = (endProgress - startProgress) / 20;
        let currentProgress = startProgress;
        
        const progressInterval = setInterval(() => {
            currentProgress += progressStep;
            if (currentProgress >= endProgress) {
                currentProgress = endProgress;
                clearInterval(progressInterval);
                
                // 完成当前步骤
                updateStepStatus(currentStep + 1, 'completed');
                currentStep++;
                
                // 处理下一步
                setTimeout(processStep, 200);
            }
            
            updateProgress(currentProgress);
        }, step.duration / 20);
    }
    
    processStep();
}

// 更新进度
function updateProgress(progress) {
    const progressFill = document.getElementById('progressFill');
    progressFill.style.width = progress + '%';
    currentUploadState.progress = progress;
}

// 更新进度文本
function updateProgressText(text) {
    document.getElementById('progressText').textContent = text;
}

// 更新步骤状态
function updateStepStatus(stepNumber, status) {
    const step = document.getElementById(`step${stepNumber}`);
    if (step) {
        step.className = `step ${status}`;
        
        if (status === 'completed') {
            step.querySelector('i').className = 'fas fa-check';
        } else if (status === 'active') {
            step.querySelector('i').className = 'fas fa-spinner fa-spin';
        }
    }
}

// 完成上传
function completeUpload() {
    setTimeout(() => {
        // 隐藏进度模态框
        document.getElementById('uploadProgressModal').style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // 显示成功通知
        showNotification('插件上传成功！审核将在1-3个工作日内完成', 'success');
        
        // 重置表单
        document.getElementById('uploadForm').reset();
        resetFileInfo();
        
        // 添加到上传历史
        addToUploadHistory();
        
        // 重置上传状态
        currentUploadState.isUploading = false;
    }, 1000);
}

// 添加到上传历史
function addToUploadHistory() {
    const formData = new FormData(document.getElementById('uploadForm'));
    const newUpload = {
        id: Date.now(),
        name: formData.get('pluginName') || document.getElementById('pluginName').value,
        version: formData.get('pluginVersion') || document.getElementById('pluginVersion').value,
        visibility: formData.get('pluginVisibility') || document.getElementById('pluginVisibility').value,
        uploadDate: new Date().toLocaleDateString('zh-CN'),
        status: 'pending',
        downloads: 0
    };
    
    uploadHistory.unshift(newUpload);
    renderUploadHistory();
}

// 渲染上传历史
function renderUploadHistory() {
    const historyList = document.getElementById('uploadHistory');
    
    if (uploadHistory.length === 0) {
        historyList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-history"></i>
                </div>
                <h3>暂无上传记录</h3>
                <p>上传您的第一个插件，开始您的创作之旅！</p>
            </div>
        `;
        return;
    }
    
    historyList.innerHTML = uploadHistory.map(upload => `
        <div class="history-item">
            <div class="history-info">
                <div class="history-name">${upload.name} v${upload.version}</div>
                <div class="history-meta">
                    <span><i class="fas fa-calendar"></i> ${upload.uploadDate}</span>
                    <span><i class="fas fa-download"></i> ${upload.downloads} 次下载</span>
                    <span><i class="fas fa-${upload.visibility === 'public' ? 'globe' : 'lock'}"></i> ${upload.visibility === 'public' ? '公开' : '私人'}</span>
                </div>
            </div>
            <span class="history-status status-${upload.status}">
                ${getStatusText(upload.status)}
            </span>
        </div>
    `).join('');
}

// 获取状态文本
function getStatusText(status) {
    const statusMap = {
        'pending': '审核中',
        'approved': '已通过',
        'rejected': '已拒绝'
    };
    return statusMap[status] || status;
}

// 重置表单
function resetForm() {
    if (confirm('确定要重置表单吗？所有已填写的内容将被清空。')) {
        document.getElementById('uploadForm').reset();
        resetFileInfo();
    }
}

// 显示通知
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8',
        warning: '#ffc107'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .empty-state {
        text-align: center;
        padding: 3rem 2rem;
        color: #666;
    }
    
    .empty-state .empty-icon {
        font-size: 3rem;
        color: #ccc;
        margin-bottom: 1rem;
    }
    
    .empty-state h3 {
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 0.5rem;
    }
    
    .empty-state p {
        color: #666;
    }
`;
document.head.appendChild(style);
