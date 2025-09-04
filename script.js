// 插件数据生成函数
function generatePluginData() {
    const categories = [
        { id: 'data-analysis', name: '数据分析', icon: 'fas fa-chart-line' },
        { id: 'optimization', name: '优化算法', icon: 'fas fa-cogs' },
        { id: 'monitoring', name: '监控系统', icon: 'fas fa-eye' },
        { id: 'prediction', name: '预测模型', icon: 'fas fa-chart-area' },
        { id: 'visualization', name: '可视化', icon: 'fas fa-chart-pie' }
    ];

    const pluginNames = [
        '光伏阵列性能分析器',
        '智能MPPT控制器',
        '阴影检测算法',
        '发电量预测模型',
        '故障诊断系统',
        '效率优化工具',
        '实时监控面板',
        '数据可视化组件',
        '天气影响分析器',
        '维护计划生成器',
        '成本效益计算器',
        '系统健康度评估',
        '智能清洗调度',
        '储能优化策略',
        '电网接入分析'
    ];

    const descriptions = [
        '基于机器学习的阵列性能分析工具，提供详细的效率报告和优化建议',
        '智能最大功率点跟踪控制器，提高光伏系统发电效率',
        '先进的阴影检测算法，自动识别并分析阴影对发电的影响',
        '基于历史数据和气象信息的发电量预测模型',
        '实时故障检测和诊断系统，提前预警潜在问题',
        '系统级效率优化工具，提供多维度优化方案',
        '实时监控面板，展示系统运行状态和关键指标',
        '丰富的数据可视化组件，支持多种图表类型',
        '天气因素对发电影响的分析工具',
        '智能维护计划生成器，优化维护时间和成本',
        '光伏项目成本效益分析计算器',
        '系统健康度综合评估工具',
        '基于天气和污染数据的智能清洗调度系统',
        '储能系统优化策略，最大化经济效益',
        '电网接入分析和合规性检查工具'
    ];

    const authors = [
        '光伏科技团队',
        '智能算法实验室',
        '新能源研究院',
        '数据科学团队',
        '系统集成专家',
        '优化算法专家',
        '监控系统开发组',
        '可视化技术团队',
        '气象数据分析师',
        '维护管理专家',
        '经济分析师',
        '健康评估专家',
        '清洁技术团队',
        '储能优化专家',
        '电网技术专家'
    ];

    const plugins = [];
    
    for (let i = 0; i < 15; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const downloads = Math.floor(Math.random() * 10000) + 100;
        const rating = (Math.random() * 2 + 3).toFixed(1); // 3.0-5.0
        const reviews = Math.floor(Math.random() * 500) + 10;
        
        plugins.push({
            id: i + 1,
            name: pluginNames[i],
            description: descriptions[i],
            category: category,
            author: authors[i],
            version: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
            downloads: downloads,
            rating: parseFloat(rating),
            reviews: reviews,
            lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            tags: generateTags(category.id)
        });
    }
    
    return plugins;
}

// 生成标签
function generateTags(categoryId) {
    const tagMap = {
        'data-analysis': ['数据分析', '性能分析', '效率评估'],
        'optimization': ['优化算法', 'MPPT', '效率提升'],
        'monitoring': ['实时监控', '状态检测', '预警系统'],
        'prediction': ['预测模型', '机器学习', '趋势分析'],
        'visualization': ['数据可视化', '图表展示', '报表生成']
    };
    return tagMap[categoryId] || ['光伏', '新能源', '智能分析'];
}

// 渲染插件卡片
function renderPluginCard(plugin) {
    return `
        <div class="plugin-card" data-category="${plugin.category.id}" onclick="navigateToDetail(${plugin.id})">
            <div class="plugin-header">
                <div>
                    <h3 class="plugin-title">${plugin.name}</h3>
                    <span class="plugin-category">${plugin.category.name}</span>
                </div>
            </div>
            <p class="plugin-description">${plugin.description}</p>
            <div class="plugin-meta">
                <span class="plugin-author">${plugin.author}</span>
                <span class="plugin-version">v${plugin.version}</span>
            </div>
            <div class="plugin-stats">
                <div class="stat">
                    <i class="fas fa-download"></i>
                    <span>${plugin.downloads.toLocaleString()}</span>
                </div>
                <div class="stat">
                    <i class="fas fa-star"></i>
                    <span>${plugin.rating}</span>
                </div>
                <div class="stat">
                    <i class="fas fa-comment"></i>
                    <span>${plugin.reviews}</span>
                </div>
            </div>
            <div class="plugin-actions" onclick="event.stopPropagation()">
                <button class="btn btn-primary" onclick="installPlugin(${plugin.id})">
                    <i class="fas fa-download"></i> 安装
                </button>
                <button class="btn btn-secondary" onclick="viewDetails(${plugin.id})">
                    <i class="fas fa-info-circle"></i> 详情
                </button>
            </div>
        </div>
    `;
}

// 渲染插件网格
function renderPluginsGrid(plugins) {
    const grid = document.getElementById('pluginsGrid');
    grid.innerHTML = plugins.map(plugin => renderPluginCard(plugin)).join('');
}

// 搜索和过滤功能
function filterPlugins() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    let filteredPlugins = allPlugins.filter(plugin => {
        const matchesSearch = plugin.name.toLowerCase().includes(searchTerm) ||
                            plugin.description.toLowerCase().includes(searchTerm) ||
                            plugin.author.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || plugin.category.id === categoryFilter;
        
        return matchesSearch && matchesCategory;
    });
    
    // 排序
    switch(sortFilter) {
        case 'popular':
            filteredPlugins.sort((a, b) => b.downloads - a.downloads);
            break;
        case 'newest':
            filteredPlugins.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
            break;
        case 'rating':
            filteredPlugins.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    renderPluginsGrid(filteredPlugins);
}

// 分类标签点击事件
function handleCategoryClick(event) {
    const category = event.target.dataset.category;
    
    // 更新标签状态
    document.querySelectorAll('.category-tag').forEach(tag => {
        tag.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // 更新过滤器
    document.getElementById('categoryFilter').value = category;
    filterPlugins();
}

// 模态框控制
function showUploadModal() {
    document.getElementById('uploadModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function hideUploadModal() {
    document.getElementById('uploadModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 插件安装功能
function installPlugin(pluginId) {
    const plugin = allPlugins.find(p => p.id === pluginId);
    if (plugin) {
        // 这里应该调用后端API进行实际安装
        showNotification(`正在安装 ${plugin.name}...`, 'info');
        
        // 模拟安装过程
        setTimeout(() => {
            showNotification(`${plugin.name} 安装成功！`, 'success');
        }, 2000);
    }
}

// 导航到详情页面
function navigateToDetail(pluginId) {
    window.location.href = `detail.html?id=${pluginId}`;
}

// 查看插件详情
function viewDetails(pluginId) {
    // 跳转到详情页面
    window.location.href = `detail.html?id=${pluginId}`;
}

// 显示通知
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#17a2b8'};
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
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 处理上传表单
function handleUploadSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const pluginData = {
        name: formData.get('pluginName'),
        description: formData.get('pluginDescription'),
        category: formData.get('pluginCategory'),
        version: formData.get('pluginVersion'),
        author: formData.get('pluginAuthor'),
        file: formData.get('pluginFile')
    };
    
    // 这里应该调用后端API进行实际上传
    showNotification('插件上传中...', 'info');
    
    // 模拟上传过程
    setTimeout(() => {
        showNotification('插件上传成功！', 'success');
        hideUploadModal();
        event.target.reset();
        
        // 重新生成插件数据（模拟新插件）
        allPlugins = generatePluginData();
        renderPluginsGrid(allPlugins);
    }, 2000);
}

// 加载更多插件
function loadMorePlugins() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 加载中...';
    loadMoreBtn.disabled = true;
    
    // 模拟加载更多数据
    setTimeout(() => {
        const newPlugins = generatePluginData().slice(0, 5); // 加载5个新插件
        allPlugins.push(...newPlugins);
        renderPluginsGrid(allPlugins);
        
        loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> 加载更多插件';
        loadMoreBtn.disabled = false;
        
        showNotification('已加载更多插件', 'success');
    }, 1500);
}

// 初始化应用
let allPlugins = [];

document.addEventListener('DOMContentLoaded', function() {
    // 生成初始插件数据
    allPlugins = generatePluginData();
    renderPluginsGrid(allPlugins);
    
    // 绑定事件监听器
    document.getElementById('searchInput').addEventListener('input', filterPlugins);
    document.getElementById('categoryFilter').addEventListener('change', filterPlugins);
    document.getElementById('sortFilter').addEventListener('change', filterPlugins);
    
    // 分类标签点击事件
    document.querySelectorAll('.category-tag').forEach(tag => {
        tag.addEventListener('click', handleCategoryClick);
    });
    
    // 模态框控制
    document.getElementById('uploadBtn').addEventListener('click', showUploadModal);
    document.getElementById('closeModal').addEventListener('click', hideUploadModal);
    document.getElementById('cancelUpload').addEventListener('click', hideUploadModal);
    
    // 点击模态框外部关闭
    document.getElementById('uploadModal').addEventListener('click', function(event) {
        if (event.target === this) {
            hideUploadModal();
        }
    });
    
    // 上传表单提交
    document.getElementById('uploadForm').addEventListener('submit', handleUploadSubmit);
    
    // 加载更多按钮
    document.getElementById('loadMoreBtn').addEventListener('click', loadMorePlugins);
    
    // 搜索按钮点击事件
    document.querySelector('.search-btn').addEventListener('click', filterPlugins);
    
    // 回车键搜索
    document.getElementById('searchInput').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            filterPlugins();
        }
    });
});

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
`;
document.head.appendChild(style);
