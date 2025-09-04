// 详情页面JavaScript逻辑

// 生成评论数据
function generateReviews() {
    const reviewAuthors = [
        '张工程师', '李技术员', '王分析师', '陈专家', '刘研究员',
        '赵开发者', '孙运维', '周数据师', '吴算法师', '郑架构师'
    ];
    
    const reviewTitles = [
        '非常实用的分析工具',
        '性能表现优秀',
        '界面友好，功能强大',
        '推荐使用',
        '满足了我的需求',
        '数据分析很准确',
        '操作简单易用',
        '功能丰富全面',
        '值得信赖的插件',
        '性价比很高'
    ];
    
    const reviewContents = [
        '这个插件帮我解决了很多性能分析的问题，数据分析非常准确，界面也很友好。强烈推荐给需要光伏阵列分析的朋友们。',
        '使用了一段时间，发现这个插件的性能表现真的很不错。处理大量数据时也很稳定，没有出现过崩溃的情况。',
        '界面设计很现代化，功能布局合理。特别是实时监控功能，让我能够及时发现问题并处理。',
        '作为一个光伏系统工程师，我经常需要分析阵列性能。这个插件提供了我需要的所有功能，非常满意。',
        '插件功能很全面，从数据采集到分析报告都有涵盖。对于我们的项目来说，这是一个不可或缺的工具。',
        '数据分析的准确性让我印象深刻，预测结果与实际运行数据非常接近。这大大提高了我们的工作效率。',
        '操作界面很直观，即使是不太懂技术的同事也能快速上手。文档也很详细，遇到问题都能找到解决方案。',
        '功能确实很丰富，从基础的性能监控到高级的机器学习分析都有。而且更新很及时，开发者很用心。',
        '在多个项目中都使用了这个插件，表现一直很稳定。是我最信赖的光伏分析工具之一。',
        '相比其他同类插件，这个的价格很合理，功能却一点都不少。性价比很高，值得购买。'
    ];
    
    const reviews = [];
    
    for (let i = 0; i < 10; i++) {
        const rating = (Math.random() * 2 + 3).toFixed(1); // 3.0-5.0
        const date = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);
        
        reviews.push({
            id: i + 1,
            author: reviewAuthors[i],
            title: reviewTitles[i],
            content: reviewContents[i],
            rating: parseFloat(rating),
            date: date.toISOString(),
            helpful: Math.floor(Math.random() * 50) + 1
        });
    }
    
    return reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// 生成相关插件数据
function generateRelatedPlugins() {
    const relatedPlugins = [
        {
            id: 2,
            name: '智能MPPT控制器',
            category: '优化算法',
            icon: 'fas fa-cogs'
        },
        {
            id: 3,
            name: '阴影检测算法',
            category: '数据分析',
            icon: 'fas fa-chart-line'
        },
        {
            id: 4,
            name: '发电量预测模型',
            category: '预测模型',
            icon: 'fas fa-chart-area'
        },
        {
            id: 5,
            name: '故障诊断系统',
            category: '监控系统',
            icon: 'fas fa-eye'
        }
    ];
    
    return relatedPlugins;
}

// 渲染评论
function renderReview(review) {
    const date = new Date(review.date).toLocaleDateString('zh-CN');
    const stars = '★'.repeat(Math.floor(review.rating)) + '☆'.repeat(5 - Math.floor(review.rating));
    
    return `
        <div class="review-item">
            <div class="review-header">
                <div>
                    <div class="review-author">${review.author}</div>
                    <div class="review-rating">
                        ${Array.from({length: 5}, (_, i) => 
                            `<i class="fas fa-star ${i < review.rating ? '' : 'text-muted'}" style="color: ${i < review.rating ? '#ffc107' : '#ddd'}"></i>`
                        ).join('')}
                        <span style="margin-left: 0.5rem; color: #666;">${review.rating}/5.0</span>
                    </div>
                </div>
                <div class="review-date">${date}</div>
            </div>
            <div class="review-title">${review.title}</div>
            <div class="review-content">${review.content}</div>
            <div style="margin-top: 1rem; font-size: 0.9rem; color: #999;">
                <i class="fas fa-thumbs-up"></i> ${review.helpful} 人觉得有用
            </div>
        </div>
    `;
}

// 渲染相关插件
function renderRelatedPlugin(plugin) {
    return `
        <a href="detail.html?id=${plugin.id}" class="related-plugin">
            <div class="related-plugin-icon">
                <i class="${plugin.icon}"></i>
            </div>
            <div class="related-plugin-info">
                <div class="related-plugin-name">${plugin.name}</div>
                <div class="related-plugin-category">${plugin.category}</div>
            </div>
        </a>
    `;
}

// 渲染插件标签
function renderTags(tags) {
    return tags.map(tag => `<span class="plugin-tag">${tag}</span>`).join('');
}

// 根据插件ID获取插件数据
function getPluginDataById(pluginId) {
    // 这里应该从后端API获取数据，现在使用模拟数据
    const pluginIdInt = parseInt(pluginId);
    
    // 模拟不同插件的数据
    const pluginsData = {
        1: {
            name: '光伏阵列性能分析器',
            author: '光伏科技团队',
            version: '2.1.0',
            category: '数据分析',
            downloads: 15420,
            rating: '4.8',
            reviews: 342,
            lastUpdated: '2024-01-15',
            description: '基于机器学习的智能光伏阵列性能分析工具，提供实时监控、数据分析和性能优化建议。支持多种数据格式，具备强大的可视化功能。',
            features: [
                '实时性能监控和分析',
                '机器学习算法支持',
                '多维度数据可视化',
                '智能故障诊断',
                '性能优化建议',
                '支持多种数据格式',
                '云端数据同步',
                '移动端适配'
            ],
            compatibleVersion: 'v1.0.0+',
            fileSize: '15.2 MB',
            license: 'MIT License',
            language: 'Python, JavaScript',
            dependencies: 'NumPy, Pandas, Matplotlib',
            tags: ['数据分析', '性能分析', '效率评估', '机器学习', '实时监控'],
            changelog: [
                {
                    version: 'v2.1.0',
                    date: '2024-01-15',
                    changes: [
                        '新增机器学习算法支持',
                        '优化数据处理性能',
                        '修复已知bug',
                        '改进用户界面'
                    ]
                },
                {
                    version: 'v2.0.0',
                    date: '2023-12-01',
                    changes: [
                        '全新UI界面设计',
                        '增加实时监控功能',
                        '支持多语言',
                        '重构核心算法'
                    ]
                },
                {
                    version: 'v1.5.0',
                    date: '2023-10-15',
                    changes: [
                        '新增数据导出功能',
                        '优化内存使用',
                        '增加批量处理能力'
                    ]
                }
            ]
        },
        2: {
            name: '智能MPPT控制器',
            author: '智能算法实验室',
            version: '1.8.0',
            category: '优化算法',
            downloads: 8920,
            rating: '4.6',
            reviews: 156,
            lastUpdated: '2024-01-10',
            description: '智能最大功率点跟踪控制器，采用先进的算法优化光伏系统发电效率，支持多种MPPT算法和实时调整。',
            features: [
                '多种MPPT算法支持',
                '实时功率点跟踪',
                '智能算法优化',
                '高效能量转换',
                '温度补偿功能',
                '故障自诊断',
                '远程监控支持',
                '低功耗设计'
            ],
            compatibleVersion: 'v1.0.0+',
            fileSize: '8.5 MB',
            license: 'Apache License 2.0',
            language: 'C++, Python',
            dependencies: 'Boost, Eigen',
            tags: ['MPPT', '优化算法', '能量转换', '实时控制', '智能算法'],
            changelog: [
                {
                    version: 'v1.8.0',
                    date: '2024-01-10',
                    changes: [
                        '新增自适应MPPT算法',
                        '优化跟踪精度',
                        '降低功耗',
                        '改进温度补偿'
                    ]
                }
            ]
        },
        3: {
            name: '阴影检测算法',
            author: '新能源研究院',
            version: '1.5.2',
            category: '数据分析',
            downloads: 5670,
            rating: '4.4',
            reviews: 89,
            lastUpdated: '2024-01-05',
            description: '先进的阴影检测算法，能够自动识别和分析阴影对光伏阵列的影响，提供详细的阴影分析报告。',
            features: [
                '自动阴影检测',
                '阴影影响分析',
                '实时监控',
                '历史数据分析',
                '预测模型',
                '可视化报告',
                '多传感器支持',
                '云端处理'
            ],
            compatibleVersion: 'v1.0.0+',
            fileSize: '12.3 MB',
            license: 'GPL v3',
            language: 'Python, MATLAB',
            dependencies: 'OpenCV, NumPy, SciPy',
            tags: ['阴影检测', '图像处理', '数据分析', '实时监控', '预测模型'],
            changelog: [
                {
                    version: 'v1.5.2',
                    date: '2024-01-05',
                    changes: [
                        '改进检测精度',
                        '新增多传感器支持',
                        '优化处理速度',
                        '修复边界检测问题'
                    ]
                }
            ]
        }
    };
    
    return pluginsData[pluginIdInt] || pluginsData[1]; // 默认返回第一个插件
}

// 更新页面数据
function updatePageData() {
    const pluginId = getPluginIdFromUrl();
    const pluginDetailData = getPluginDataById(pluginId);
    // 更新基本信息
    document.getElementById('pluginTitle').textContent = pluginDetailData.name;
    document.getElementById('pluginAuthor').textContent = pluginDetailData.author;
    document.getElementById('pluginVersion').textContent = `v${pluginDetailData.version}`;
    document.getElementById('pluginCategory').textContent = pluginDetailData.category;
    
    // 更新统计信息
    document.getElementById('downloadCount').textContent = pluginDetailData.downloads.toLocaleString();
    document.getElementById('ratingValue').textContent = pluginDetailData.rating;
    document.getElementById('reviewCount').textContent = pluginDetailData.reviews;
    document.getElementById('updateDate').textContent = pluginDetailData.lastUpdated;
    
    // 更新描述
    document.getElementById('pluginDescription').textContent = pluginDetailData.description;
    
    // 更新功能特性
    const featureList = document.getElementById('featureList');
    featureList.innerHTML = pluginDetailData.features.map(feature => 
        `<li><i class="fas fa-check"></i> ${feature}</li>`
    ).join('');
    
    // 更新技术规格
    const specsGrid = document.querySelector('.specs-grid');
    specsGrid.innerHTML = `
        <div class="spec-item">
            <span class="spec-label">兼容版本</span>
            <span class="spec-value">${pluginDetailData.compatibleVersion}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">文件大小</span>
            <span class="spec-value">${pluginDetailData.fileSize}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">许可证</span>
            <span class="spec-value">${pluginDetailData.license}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">编程语言</span>
            <span class="spec-value">${pluginDetailData.language}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">依赖项</span>
            <span class="spec-value">${pluginDetailData.dependencies}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">更新时间</span>
            <span class="spec-value">${pluginDetailData.lastUpdated}</span>
        </div>
    `;
    
    // 更新更新日志
    const changelog = document.querySelector('.changelog');
    changelog.innerHTML = pluginDetailData.changelog.map(item => `
        <div class="changelog-item">
            <div class="changelog-version">${item.version} (${item.date})</div>
            <ul class="changelog-list">
                ${item.changes.map(change => `<li>${change}</li>`).join('')}
            </ul>
        </div>
    `).join('');
    
    // 更新评论
    const reviews = generateReviews();
    const reviewsList = document.getElementById('reviewsList');
    reviewsList.innerHTML = reviews.map(review => renderReview(review)).join('');
    
    // 更新相关插件
    const relatedPlugins = generateRelatedPlugins();
    const relatedPluginsContainer = document.getElementById('relatedPlugins');
    relatedPluginsContainer.innerHTML = relatedPlugins.map(plugin => renderRelatedPlugin(plugin)).join('');
    
    // 更新标签
    const pluginTags = document.getElementById('pluginTags');
    pluginTags.innerHTML = renderTags(pluginDetailData.tags);
}

// 收藏功能
function toggleFavorite() {
    const favoriteIcon = document.getElementById('favoriteIcon');
    const favoriteText = document.getElementById('favoriteText');
    
    if (favoriteIcon.classList.contains('text-danger')) {
        favoriteIcon.classList.remove('text-danger');
        favoriteText.textContent = '收藏';
        showNotification('已取消收藏', 'info');
    } else {
        favoriteIcon.classList.add('text-danger');
        favoriteText.textContent = '已收藏';
        showNotification('已添加到收藏', 'success');
    }
}

// 安装插件
function installPlugin() {
    showNotification('正在安装插件...', 'info');
    
    setTimeout(() => {
        showNotification('插件安装成功！', 'success');
    }, 2000);
}

// 显示评论表单
function showReviewForm() {
    document.getElementById('reviewModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// 隐藏评论表单
function hideReviewForm() {
    document.getElementById('reviewModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('reviewForm').reset();
    
    // 重置评分
    document.querySelectorAll('.rating-input i').forEach(star => {
        star.classList.remove('active');
    });
}

// 处理评分选择
function handleRatingSelect(event) {
    const rating = parseInt(event.target.dataset.rating);
    const stars = document.querySelectorAll('.rating-input i');
    
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// 处理评论提交
function handleReviewSubmit(event) {
    event.preventDefault();
    
    const title = document.getElementById('reviewTitle').value;
    const content = document.getElementById('reviewContent').value;
    const rating = document.querySelectorAll('.rating-input i.active').length;
    
    if (rating === 0) {
        showNotification('请选择评分', 'error');
        return;
    }
    
    showNotification('评论提交中...', 'info');
    
    setTimeout(() => {
        showNotification('评论提交成功！', 'success');
        hideReviewForm();
        
        // 模拟添加新评论
        const newReview = {
            id: Date.now(),
            author: '当前用户',
            title: title,
            content: content,
            rating: rating,
            date: new Date().toISOString(),
            helpful: 0
        };
        
        const reviewsList = document.getElementById('reviewsList');
        const newReviewHtml = renderReview(newReview);
        reviewsList.insertAdjacentHTML('afterbegin', newReviewHtml);
        
        // 更新评论数量
        const reviewCount = document.getElementById('reviewCount');
        const currentCount = parseInt(reviewCount.textContent);
        reviewCount.textContent = currentCount + 1;
    }, 1500);
}

// 加载更多评论
function loadMoreReviews() {
    const loadMoreBtn = document.querySelector('.load-more-reviews .btn');
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 加载中...';
    loadMoreBtn.disabled = true;
    
    setTimeout(() => {
        const additionalReviews = generateReviews().slice(0, 5);
        const reviewsList = document.getElementById('reviewsList');
        
        additionalReviews.forEach(review => {
            const reviewHtml = renderReview(review);
            reviewsList.insertAdjacentHTML('beforeend', reviewHtml);
        });
        
        loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> 加载更多评论';
        loadMoreBtn.disabled = false;
        
        showNotification('已加载更多评论', 'success');
    }, 1500);
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

// 从URL获取插件ID
function getPluginIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || 1;
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    // 更新页面数据
    updatePageData();
    
    // 绑定事件监听器
    document.querySelectorAll('.rating-input i').forEach(star => {
        star.addEventListener('click', handleRatingSelect);
    });
    
    document.getElementById('reviewForm').addEventListener('submit', handleReviewSubmit);
    
    // 点击模态框外部关闭
    document.getElementById('reviewModal').addEventListener('click', function(event) {
        if (event.target === this) {
            hideReviewForm();
        }
    });
    
    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        .text-danger {
            color: #dc3545 !important;
        }
        
        .text-muted {
            color: #6c757d !important;
        }
        
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
    `;
    document.head.appendChild(style);
});
