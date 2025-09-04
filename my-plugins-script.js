// 我的插件页面JavaScript逻辑

// 当前用户数据
let currentUser = {
    id: 1,
    name: '当前用户',
    email: 'user@example.com'
};

// 我的插件数据
let myPlugins = {
    installed: [],
    uploaded: [],
    favorites: [],
    updates: []
};

// 当前选中的标签页
let currentTab = 'installed';

// 生成已安装插件数据
function generateInstalledPlugins() {
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
        '系统健康度评估'
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
        '系统健康度综合评估工具'
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
        '健康评估专家'
    ];

    const categories = [
        { id: 'data-analysis', name: '数据分析', icon: 'fas fa-chart-line' },
        { id: 'optimization', name: '优化算法', icon: 'fas fa-cogs' },
        { id: 'monitoring', name: '监控系统', icon: 'fas fa-eye' },
        { id: 'prediction', name: '预测模型', icon: 'fas fa-chart-area' },
        { id: 'visualization', name: '可视化', icon: 'fas fa-chart-pie' }
    ];

    const plugins = [];
    
    for (let i = 0; i < 12; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const installDate = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);
        const hasUpdate = Math.random() > 0.7; // 30% 概率有更新
        const isFavorite = Math.random() > 0.6; // 40% 概率被收藏
        
        plugins.push({
            id: i + 1,
            name: pluginNames[i],
            description: descriptions[i],
            category: category,
            author: authors[i],
            version: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
            installDate: installDate.toISOString(),
            fileSize: `${(Math.random() * 10 + 1).toFixed(1)} MB`,
            license: ['MIT License', 'Apache License 2.0', 'GPL v3'][Math.floor(Math.random() * 3)],
            hasUpdate: hasUpdate,
            isFavorite: isFavorite,
            status: 'installed'
        });
    }
    
    return plugins;
}

// 生成已上传插件数据
function generateUploadedPlugins() {
    const uploadedPlugins = [
        {
            id: 101,
            name: '自定义数据分析工具',
            description: '根据项目需求定制的数据分析插件，支持多种数据格式和自定义算法',
            category: { id: 'data-analysis', name: '数据分析', icon: 'fas fa-chart-line' },
            author: currentUser.name,
            version: '1.2.0',
            uploadDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            fileSize: '3.2 MB',
            license: 'MIT License',
            downloads: 45,
            status: 'uploaded'
        },
        {
            id: 102,
            name: '智能清洗调度系统',
            description: '基于天气和污染数据的智能清洗调度系统，优化清洗时间和成本',
            category: { id: 'optimization', name: '优化算法', icon: 'fas fa-cogs' },
            author: currentUser.name,
            version: '2.0.1',
            uploadDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            fileSize: '5.8 MB',
            license: 'Apache License 2.0',
            downloads: 128,
            status: 'uploaded'
        },
        {
            id: 103,
            name: '储能优化策略',
            description: '储能系统优化策略，最大化经济效益和系统稳定性',
            category: { id: 'optimization', name: '优化算法', icon: 'fas fa-cogs' },
            author: currentUser.name,
            version: '1.5.3',
            uploadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            fileSize: '4.1 MB',
            license: 'GPL v3',
            downloads: 67,
            status: 'uploaded'
        }
    ];
    
    return uploadedPlugins;
}

// 渲染我的插件卡片
function renderMyPluginCard(plugin) {
    const installDate = new Date(plugin.installDate || plugin.uploadDate).toLocaleDateString('zh-CN');
    const updateBadge = plugin.hasUpdate ? '<div class="update-badge">!</div>' : '';
    
    return `
        <div class="my-plugin-card ${plugin.status}" data-plugin-id="${plugin.id}">
            ${updateBadge}
            <div class="plugin-header">
                <div>
                    <h3 class="plugin-title">${plugin.name}</h3>
                    <span class="plugin-category">${plugin.category.name}</span>
                </div>
                <span class="plugin-status status-${plugin.status}">${getStatusText(plugin.status)}</span>
            </div>
            <p class="plugin-description">${plugin.description}</p>
            <div class="plugin-meta">
                <span class="plugin-author">${plugin.author}</span>
                <span class="plugin-version">v${plugin.version}</span>
            </div>
            <div class="plugin-info">
                <div class="info-item">
                    <i class="fas fa-calendar"></i>
                    <span>${installDate}</span>
                </div>
                <div class="info-item">
                    <i class="fas fa-file-archive"></i>
                    <span>${plugin.fileSize}</span>
                </div>
                ${plugin.downloads ? `
                <div class="info-item">
                    <i class="fas fa-download"></i>
                    <span>${plugin.downloads}</span>
                </div>
                ` : ''}
            </div>
            <div class="plugin-actions">
                <button class="btn btn-primary btn-small" onclick="showPluginDetail(${plugin.id})">
                    <i class="fas fa-info-circle"></i> 详情
                </button>
                ${plugin.hasUpdate ? `
                <button class="btn btn-secondary btn-small" onclick="updatePlugin(${plugin.id})">
                    <i class="fas fa-sync-alt"></i> 更新
                </button>
                ` : ''}
                <button class="btn btn-secondary btn-small" onclick="toggleFavorite(${plugin.id})">
                    <i class="fas fa-heart ${plugin.isFavorite ? 'favorite-icon' : 'favorite-icon inactive'}"></i>
                    ${plugin.isFavorite ? '取消收藏' : '收藏'}
                </button>
                ${plugin.status === 'installed' ? `
                <button class="btn btn-secondary btn-small" onclick="uninstallPlugin(${plugin.id})">
                    <i class="fas fa-trash"></i> 卸载
                </button>
                ` : ''}
            </div>
        </div>
    `;
}

// 获取状态文本
function getStatusText(status) {
    const statusMap = {
        'installed': '已安装',
        'uploaded': '已上传',
        'favorite': '已收藏',
        'update': '可更新'
    };
    return statusMap[status] || status;
}

// 更新统计信息
function updateStats() {
    document.getElementById('installedCount').textContent = myPlugins.installed.length;
    document.getElementById('uploadedCount').textContent = myPlugins.uploaded.length;
    document.getElementById('favoriteCount').textContent = myPlugins.favorites.length;
    document.getElementById('updateCount').textContent = myPlugins.updates.length;
}

// 渲染插件列表
function renderPluginList(type) {
    const gridId = `${type}PluginsGrid`;
    const grid = document.getElementById(gridId);
    
    if (!grid) return;
    
    let plugins = [];
    switch (type) {
        case 'installed':
            plugins = myPlugins.installed;
            break;
        case 'uploaded':
            plugins = myPlugins.uploaded;
            break;
        case 'favorites':
            plugins = myPlugins.favorites;
            break;
        case 'updates':
            plugins = myPlugins.updates;
            break;
    }
    
    if (plugins.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-box-open"></i>
                </div>
                <h3>暂无${getTabTitle(type)}插件</h3>
                <p>${getEmptyMessage(type)}</p>
                ${type === 'installed' ? `
                <a href="index.html" class="btn btn-primary">
                    <i class="fas fa-store"></i>
                    浏览插件商店
                </a>
                ` : ''}
            </div>
        `;
    } else {
        grid.innerHTML = plugins.map(plugin => renderMyPluginCard(plugin)).join('');
    }
}

// 获取标签页标题
function getTabTitle(type) {
    const titles = {
        'installed': '已安装',
        'uploaded': '已上传',
        'favorites': '收藏',
        'updates': '可更新'
    };
    return titles[type] || type;
}

// 获取空状态消息
function getEmptyMessage(type) {
    const messages = {
        'installed': '您还没有安装任何插件，快去插件商店看看吧！',
        'uploaded': '您还没有上传任何插件，点击"上传插件"开始分享您的作品！',
        'favorites': '您还没有收藏任何插件，在插件商店中收藏您喜欢的插件吧！',
        'updates': '所有插件都是最新版本，无需更新！'
    };
    return messages[type] || '暂无数据';
}

// 切换标签页
function switchTab(tabName) {
    // 更新标签页按钮状态
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // 更新标签页内容
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    currentTab = tabName;
    renderPluginList(tabName);
}

// 显示插件详情
function showPluginDetail(pluginId) {
    // 跳转到独立的插件详情页面
    window.location.href = `detail.html?id=${pluginId}`;
}

// 隐藏插件详情模态框
function hidePluginDetailModal() {
    document.getElementById('pluginDetailModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 查找插件
function findPluginById(pluginId) {
    return [...myPlugins.installed, ...myPlugins.uploaded, ...myPlugins.favorites, ...myPlugins.updates]
        .find(plugin => plugin.id == pluginId);
}

// 切换收藏状态
function toggleFavorite(pluginId) {
    const plugin = findPluginById(pluginId);
    if (!plugin) return;
    
    plugin.isFavorite = !plugin.isFavorite;
    
    if (plugin.isFavorite) {
        // 添加到收藏夹
        if (!myPlugins.favorites.find(p => p.id === plugin.id)) {
            myPlugins.favorites.push({...plugin, status: 'favorite'});
        }
        showNotification('已添加到收藏夹', 'success');
    } else {
        // 从收藏夹移除
        myPlugins.favorites = myPlugins.favorites.filter(p => p.id !== plugin.id);
        showNotification('已从收藏夹移除', 'info');
    }
    
    updateStats();
    
    // 刷新当前标签页
    renderPluginList(currentTab);
}

// 更新插件
function updatePlugin(pluginId) {
    const plugin = findPluginById(pluginId);
    if (!plugin) return;
    
    showNotification('正在检查更新...', 'info');
    
    setTimeout(() => {
        plugin.hasUpdate = false;
        plugin.version = `${plugin.version.split('.')[0]}.${parseInt(plugin.version.split('.')[1]) + 1}.0`;
        
        // 从更新列表中移除
        myPlugins.updates = myPlugins.updates.filter(p => p.id !== plugin.id);
        
        showNotification('插件更新成功！', 'success');
        updateStats();
        renderPluginList(currentTab);
    }, 2000);
}

// 卸载插件
function uninstallPlugin(pluginId) {
    const plugin = findPluginById(pluginId);
    if (!plugin) return;
    
    if (confirm(`确定要卸载 "${plugin.name}" 吗？`)) {
        showNotification('正在卸载插件...', 'info');
        
        setTimeout(() => {
            // 从已安装列表中移除
            myPlugins.installed = myPlugins.installed.filter(p => p.id !== plugin.id);
            
            // 从收藏夹中移除
            myPlugins.favorites = myPlugins.favorites.filter(p => p.id !== plugin.id);
            
            showNotification('插件卸载成功！', 'success');
            updateStats();
            renderPluginList(currentTab);
        }, 1500);
    }
}

// 刷新插件
function refreshPlugins() {
    showNotification('正在刷新插件列表...', 'info');
    
    setTimeout(() => {
        // 重新生成数据
        myPlugins.installed = generateInstalledPlugins();
        myPlugins.uploaded = generateUploadedPlugins();
        
        // 更新收藏夹和更新列表
        myPlugins.favorites = myPlugins.installed.filter(p => p.isFavorite);
        myPlugins.updates = myPlugins.installed.filter(p => p.hasUpdate);
        
        updateStats();
        renderPluginList(currentTab);
        
        showNotification('插件列表已刷新！', 'success');
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

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    // 初始化数据
    myPlugins.installed = generateInstalledPlugins();
    myPlugins.uploaded = generateUploadedPlugins();
    myPlugins.favorites = myPlugins.installed.filter(p => p.isFavorite);
    myPlugins.updates = myPlugins.installed.filter(p => p.hasUpdate);
    
    // 更新统计信息
    updateStats();
    
    // 渲染默认标签页
    renderPluginList('installed');
    
    // 绑定事件监听器
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            switchTab(tabName);
        });
    });
    
    // 点击模态框外部关闭
    document.getElementById('pluginDetailModal').addEventListener('click', function(event) {
        if (event.target === this) {
            hidePluginDetailModal();
        }
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
});
