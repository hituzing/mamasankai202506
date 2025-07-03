// メンバーデータ
const members = [
    {
        id: 'kawai_miki',
        name: '河合 未希',
        position: '主任',
        familyInfo: '主人・長女（7歳）次女（3歳）長男（1歳）私の5人家族',
        photoUrl: 'images/kawai_miki.jpg'
    },
    {
        id: 'kawamura_naoko',
        name: '川村 奈緒子',
        position: '主任',
        familyInfo: '主人、双子の長女（2歳）、次男（2歳）、私の4人家族',
        photoUrl: 'images/kawamura_naoko.jpg'
    },
    {
        id: 'hayashi_keiko',
        name: '林 桂子',
        position: '主任',
        familyInfo: '主人・長女（19歳）長男（16歳）次男（7歳）私の5人家族',
        photoUrl: 'images/hayashi_keiko.jpg'
    },
    {
        id: 'pham_thi_huong',
        name: 'ファム ティフーン',
        position: 'メンバー',
        familyInfo: '主人、長女（1歳）、私の3人家族',
        photoUrl: 'images/pham_thi_huong.jpg'
    },
    {
        id: 'agawa_sumire',
        name: '阿川 すみれ',
        position: 'メンバー',
        familyInfo: '主人、長男（おなかの中）、私の3人家族',
        photoUrl: 'images/agawa_sumire.jpg'
    }
];

// 活動報告データ
let reports = [
    {
        id: 'report_001',
        date: '2025-06-11',
        title: '第一回ママさん会（キックオフ）',
        content: `■目的：ママさんが「働きやすい環境」で活躍できるよう、課題を共有し、今後の方向性を話し合う。

■主な議題：
1. 開会のあいさつ
2. 本日の会の意義とゴールの共有
3. 山本執行役員より挨拶
4. 自己紹介（名前、所属、簡単な家庭状況）
5. 発足の背景・本会の目的（ゴール）・スケジュール
6. 予算について
7. 次回の会議について

■参加者：河合主任、林主任、ファムさん、阿川さん、川村
■司会：河合主任
■議事録担当：川村`,
        author: '川村 奈緒子'
    }
];

// 予定データ
let schedules = [
    {
        id: 'schedule_001',
        date: '2025-07-15',
        title: '第二回ママさん会',
        description: '前回の振り返りと今後の活動計画について話し合います',
        time: '14:00-15:30',
        location: 'オンライン'
    },
    {
        id: 'schedule_002',
        date: '2025-08-20',
        title: '働き方改善提案検討会',
        description: '具体的な働き方改善案を検討し、提案書を作成します',
        time: '13:30-16:00',
        location: '会議室A'
    }
];

// DOM要素
const membersGrid = document.getElementById('membersGrid');
const memberSelect = document.getElementById('memberSelect');
const photoUpload = document.getElementById('photoUpload');
const uploadBtn = document.getElementById('uploadBtn');
const fileName = document.getElementById('fileName');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');
const savePhotoBtn = document.getElementById('savePhotoBtn');
const reportsContainer = document.getElementById('reportsContainer');
const addReportBtn = document.getElementById('addReportBtn');
const scheduleContainer = document.getElementById('scheduleContainer');
const addScheduleBtn = document.getElementById('addScheduleBtn');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notificationMessage');
const menuToggle = document.getElementById('menuToggle');

// メンバー管理クラス
class MemberManager {
    static displayMembers() {
        membersGrid.innerHTML = '';
        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.className = 'member-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer';
            
            // デフォルトのアバター画像（SVG）
            const defaultAvatar = `data:image/svg+xml;base64,${btoa(`
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="120" height="120" fill="#F3F4F6"/>
                    <circle cx="60" cy="40" r="16" fill="#9B9BA3"/>
                    <path d="M24 96C24 81.9086 35.9086 70 50 70H70C84.0914 70 96 81.9086 96 96V120H24V96Z" fill="#9B9BA3"/>
                </svg>
            `)}`;

            memberCard.innerHTML = `
                <div class="text-center">
                    <div class="mb-4">
                        <img src="${member.photoUrl}" alt="${member.name}さんの写真" 
                             class="profile-image w-24 h-24 object-cover rounded-full mx-auto border-4 border-pink-200 shadow-md"
                             onerror="this.src='${defaultAvatar}'; this.classList.add('default-avatar');"
                             loading="lazy">
                    </div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">${member.name}</h3>
                    <p class="text-pink-600 font-medium mb-3">${member.position}</p>
                    <div class="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <p class="font-medium mb-1">家族構成：</p>
                        <p>${member.familyInfo}</p>
                    </div>
                </div>
            `;
            
            memberCard.addEventListener('click', () => {
                UIManager.showMemberDetail(member);
            });
            
            // ホバーエフェクトの追加
            memberCard.addEventListener('mouseenter', () => {
                memberCard.style.transform = 'translateY(-4px)';
            });
            
            memberCard.addEventListener('mouseleave', () => {
                memberCard.style.transform = 'translateY(0)';
            });
            
            membersGrid.appendChild(memberCard);
        });
    }

    static populateMemberSelect() {
        memberSelect.innerHTML = '<option value="">メンバーを選択してください</option>';
        members.forEach(member => {
            const option = document.createElement('option');
            option.value = member.id;
            option.textContent = member.name;
            memberSelect.appendChild(option);
        });
    }

    static async updateMemberPhoto(memberId, photoFile) {
        try {
            const member = members.find(m => m.id === memberId);
            if (!member) {
                throw new Error('メンバーが見つかりません');
            }

            // 画像をBase64に変換
            const base64 = await ImageUploader.fileToBase64(photoFile);
            member.photoUrl = base64;

            // ローカルストレージに保存
            localStorage.setItem('members', JSON.stringify(members));

            // 表示を更新
            MemberManager.displayMembers();
            
            UIManager.showNotification(`${member.name}さんの写真が更新されました`, 'success');
            return true;
        } catch (error) {
            console.error('写真更新エラー:', error);
            UIManager.showNotification('写真の更新に失敗しました', 'error');
            return false;
        }
    }

    static resetMemberPhoto(memberId) {
        const member = members.find(m => m.id === memberId);
        if (!member) return;

        // 元の画像URLに戻す
        const originalPhotos = {
            'kawai_miki': 'images/kawai_miki.jpg',
            'kawamura_naoko': 'images/kawamura_naoko.jpg',
            'hayashi_keiko': 'images/hayashi_keiko.jpg',
            'pham_thi_huong': 'images/pham_thi_huong.jpg',
            'agawa_sumire': 'images/agawa_sumire.jpg'
        };

        member.photoUrl = originalPhotos[memberId] || 'images/default-avatar.png';
        localStorage.setItem('members', JSON.stringify(members));
        MemberManager.displayMembers();
        UIManager.showNotification(`${member.name}さんの写真をリセットしました`, 'success');
    }
}

// 活動報告管理クラス
class ReportManager {
    static displayReports() {
        reportsContainer.innerHTML = '';
        reports.forEach(report => {
            const reportCard = document.createElement('div');
            reportCard.className = 'report-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300';
            reportCard.innerHTML = `
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">${report.title}</h3>
                        <div class="flex items-center space-x-4 text-sm text-gray-600">
                            <span>📅 ${new Date(report.date).toLocaleDateString('ja-JP')}</span>
                            <span>👤 ${report.author}</span>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="ReportManager.editReport('${report.id}')" 
                                class="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                                title="編集">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <button onclick="ReportManager.deleteReport('${report.id}')" 
                                class="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                title="削除">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="text-gray-700 whitespace-pre-line">${report.content.substring(0, 200)}${report.content.length > 200 ? '...' : ''}</div>
                <button onclick="UIManager.showReportDetail('${report.id}')" 
                        class="mt-4 text-pink-600 hover:text-pink-800 font-medium transition-colors">
                    詳細を見る →
                </button>
            `;
            reportsContainer.appendChild(reportCard);
        });
    }

    static addReport(reportData) {
        const newReport = {
            id: `report_${Date.now()}`,
            date: reportData.date,
            title: reportData.title,
            content: reportData.content,
            author: reportData.author
        };
        reports.unshift(newReport);
        localStorage.setItem('reports', JSON.stringify(reports));
        ReportManager.displayReports();
        UIManager.showNotification('活動報告が追加されました', 'success');
    }

    static editReport(reportId) {
        const report = reports.find(r => r.id === reportId);
        if (!report) return;

        UIManager.showReportForm(report);
    }

    static updateReport(reportId, reportData) {
        const reportIndex = reports.findIndex(r => r.id === reportId);
        if (reportIndex === -1) return;

        reports[reportIndex] = { ...reports[reportIndex], ...reportData };
        localStorage.setItem('reports', JSON.stringify(reports));
        ReportManager.displayReports();
        UIManager.showNotification('活動報告が更新されました', 'success');
    }

    static deleteReport(reportId) {
        if (confirm('この活動報告を削除しますか？')) {
            reports = reports.filter(r => r.id !== reportId);
            localStorage.setItem('reports', JSON.stringify(reports));
            ReportManager.displayReports();
            UIManager.showNotification('活動報告が削除されました', 'success');
        }
    }
}

// 予定管理クラス
class ScheduleManager {
    static displaySchedules() {
        scheduleContainer.innerHTML = '';
        schedules.forEach(schedule => {
            const scheduleItem = document.createElement('div');
            scheduleItem.className = 'schedule-item bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300';
            scheduleItem.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">${schedule.title}</h3>
                        <div class="space-y-1 text-sm text-gray-600">
                            <p>📅 ${new Date(schedule.date).toLocaleDateString('ja-JP')}</p>
                            <p>🕐 ${schedule.time}</p>
                            <p>📍 ${schedule.location}</p>
                        </div>
                        <p class="mt-3 text-gray-700">${schedule.description}</p>
                    </div>
                    <div class="flex space-x-2 ml-4">
                        <button onclick="ScheduleManager.editSchedule('${schedule.id}')" 
                                class="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                                title="編集">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <button onclick="ScheduleManager.deleteSchedule('${schedule.id}')" 
                                class="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                title="削除">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            scheduleContainer.appendChild(scheduleItem);
        });
    }

    static addSchedule(scheduleData) {
        const newSchedule = {
            id: `schedule_${Date.now()}`,
            ...scheduleData
        };
        schedules.push(newSchedule);
        schedules.sort((a, b) => new Date(a.date) - new Date(b.date));
        localStorage.setItem('schedules', JSON.stringify(schedules));
        ScheduleManager.displaySchedules();
        UIManager.showNotification('予定が追加されました', 'success');
    }

    static editSchedule(scheduleId) {
        const schedule = schedules.find(s => s.id === scheduleId);
        if (!schedule) return;

        UIManager.showScheduleForm(schedule);
    }

    static updateSchedule(scheduleId, scheduleData) {
        const scheduleIndex = schedules.findIndex(s => s.id === scheduleId);
        if (scheduleIndex === -1) return;

        schedules[scheduleIndex] = { ...schedules[scheduleIndex], ...scheduleData };
        schedules.sort((a, b) => new Date(a.date) - new Date(b.date));
        localStorage.setItem('schedules', JSON.stringify(schedules));
        ScheduleManager.displaySchedules();
        UIManager.showNotification('予定が更新されました', 'success');
    }

    static deleteSchedule(scheduleId) {
        if (confirm('この予定を削除しますか？')) {
            schedules = schedules.filter(s => s.id !== scheduleId);
            localStorage.setItem('schedules', JSON.stringify(schedules));
            ScheduleManager.displaySchedules();
            UIManager.showNotification('予定が削除されました', 'success');
        }
    }
}

// 画像アップロード管理クラス
class ImageUploader {
    static async fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    static validateImageFile(file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.type)) {
            UIManager.showNotification('JPEG、PNG、GIF、WebP形式の画像ファイルを選択してください', 'error');
            return false;
        }

        if (file.size > maxSize) {
            UIManager.showNotification('ファイルサイズは5MB以下にしてください', 'error');
            return false;
        }

        return true;
    }

    static async previewImage(file) {
        if (!ImageUploader.validateImageFile(file)) {
            return false;
        }

        try {
            const base64 = await ImageUploader.fileToBase64(file);
            previewImg.src = base64;
            imagePreview.classList.remove('hidden');
            savePhotoBtn.disabled = false;
            return true;
        } catch (error) {
            console.error('画像プレビューエラー:', error);
            UIManager.showNotification('画像のプレビューに失敗しました', 'error');
            return false;
        }
    }
}

// UI管理クラス
class UIManager {
    static showModal(title, content) {
        modalTitle.textContent = title;
        modalContent.innerHTML = content;
        modal.classList.remove('hidden');
        modal.querySelector('.bg-white').classList.add('modal-enter');
        document.body.style.overflow = 'hidden';
    }

    static hideModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    static showNotification(message, type = 'success') {
        notificationMessage.textContent = message;
        
        // 通知タイプに応じたスタイル設定
        const typeStyles = {
            success: 'bg-green-500 text-white',
            error: 'bg-red-500 text-white',
            warning: 'bg-yellow-500 text-white',
            info: 'bg-blue-500 text-white'
        };
        
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 z-50 ${typeStyles[type] || typeStyles.success}`;
        notification.style.transform = 'translateX(0)';
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
        }, 3000);
    }

    static showMemberDetail(member) {
        const defaultAvatar = `data:image/svg+xml;base64,${btoa(`
            <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="128" height="128" fill="#F3F4F6"/>
                <circle cx="64" cy="42" r="18" fill="#9B9BA3"/>
                <path d="M26 102C26 86.536 38.536 74 54 74H74C89.464 74 102 86.536 102 102V128H26V102Z" fill="#9B9BA3"/>
            </svg>
        `)}`;

        const content = `
            <div class="text-center">
                <img src="${member.photoUrl}" alt="${member.name}さんの写真" 
                     class="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-pink-200 shadow-lg"
                     onerror="this.src='${defaultAvatar}'; this.classList.add('default-avatar');"
                     loading="lazy">
                <h3 class="text-2xl font-bold text-gray-800 mb-2">${member.name}</h3>
                <p class="text-pink-600 font-medium text-lg mb-4">${member.position}</p>
                <div class="bg-gray-50 p-4 rounded-lg text-left">
                    <h4 class="font-semibold text-gray-800 mb-2">家族構成</h4>
                    <p class="text-gray-700">${member.familyInfo}</p>
                </div>
                <div class="mt-4 flex justify-center space-x-4">
                    <button onclick="MemberManager.resetMemberPhoto('${member.id}')" 
                            class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                        写真をリセット
                    </button>
                </div>
            </div>
        `;
        UIManager.showModal(`${member.name}さんのプロフィール`, content);
    }

    static showReportDetail(reportId) {
        const report = reports.find(r => r.id === reportId);
        if (!report) return;

        const content = `
            <div class="space-y-4">
                <div class="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <span>📅 ${new Date(report.date).toLocaleDateString('ja-JP')}</span>
                    <span>👤 ${report.author}</span>
                </div>
                <div class="prose max-w-none">
                    <div class="whitespace-pre-line text-gray-700 leading-relaxed">${report.content}</div>
                </div>
            </div>
        `;
        UIManager.showModal(report.title, content);
    }

    static showReportForm(report = null) {
        const isEdit = !!report;
        const content = `
            <form id="reportForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">タイトル</label>
                    <input type="text" id="reportTitle" value="${report?.title || ''}" 
                           class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" 
                           required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">日付</label>
                    <input type="date" id="reportDate" value="${report?.date || new Date().toISOString().split('T')[0]}" 
                           class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" 
                           required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">作成者</label>
                    <select id="reportAuthor" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" required>
                        <option value="">選択してください</option>
                        ${members.map(member => 
                            `<option value="${member.name}" ${report?.author === member.name ? 'selected' : ''}>${member.name}</option>`
                        ).join('')}
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">内容</label>
                    <textarea id="reportContent" rows="8" 
                              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" 
                              required>${report?.content || ''}</textarea>
                </div>
                <div class="flex space-x-4">
                    <button type="submit" class="flex-1 bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors">
                        ${isEdit ? '更新' : '追加'}
                    </button>
                    <button type="button" onclick="UIManager.hideModal()" 
                            class="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors">
                        キャンセル
                    </button>
                </div>
            </form>
        `;

        UIManager.showModal(`活動報告を${isEdit ? '編集' : '追加'}`, content);

        document.getElementById('reportForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = {
                title: document.getElementById('reportTitle').value,
                date: document.getElementById('reportDate').value,
                author: document.getElementById('reportAuthor').value,
                content: document.getElementById('reportContent').value
            };

            if (isEdit) {
                ReportManager.updateReport(report.id, formData);
            } else {
                ReportManager.addReport(formData);
            }
            UIManager.hideModal();
        });
    }

    static showScheduleForm(schedule = null) {
        const isEdit = !!schedule;
        const content = `
            <form id="scheduleForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">タイトル</label>
                    <input type="text" id="scheduleTitle" value="${schedule?.title || ''}" 
                           class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                           required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">日付</label>
                    <input type="date" id="scheduleDate" value="${schedule?.date || ''}" 
                           class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                           required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">時間</label>
                    <input type="text" id="scheduleTime" value="${schedule?.time || ''}" 
                           placeholder="例: 14:00-15:30"
                           class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                           required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">場所</label>
                    <input type="text" id="scheduleLocation" value="${schedule?.location || ''}" 
                           placeholder="例: オンライン、会議室A"
                           class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                           required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">説明</label>
                    <textarea id="scheduleDescription" rows="4" 
                              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                              required>${schedule?.description || ''}</textarea>
                </div>
                <div class="flex space-x-4">
                    <button type="submit" class="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors">
                        ${isEdit ? '更新' : '追加'}
                    </button>
                    <button type="button" onclick="UIManager.hideModal()" 
                            class="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors">
                        キャンセル
                    </button>
                </div>
            </form>
        `;

        UIManager.showModal(`予定を${isEdit ? '編集' : '追加'}`, content);

        document.getElementById('scheduleForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = {
                title: document.getElementById('scheduleTitle').value,
                date: document.getElementById('scheduleDate').value,
                time: document.getElementById('scheduleTime').value,
                location: document.getElementById('scheduleLocation').value,
                description: document.getElementById('scheduleDescription').value
            };

            if (isEdit) {
                ScheduleManager.updateSchedule(schedule.id, formData);
            } else {
                ScheduleManager.addSchedule(formData);
            }
            UIManager.hideModal();
        });
    }
}

// フォームリセット関数
function resetUploadForm() {
    memberSelect.value = '';
    photoUpload.value = '';
    fileName.textContent = '';
    imagePreview.classList.add('hidden');
    savePhotoBtn.disabled = true;
}

// イベントリスナーの設定
document.addEventListener('DOMContentLoaded', () => {
    // ローカルストレージからデータを読み込み
    const savedMembers = localStorage.getItem('members');
    if (savedMembers) {
        members.splice(0, members.length, ...JSON.parse(savedMembers));
    }

    const savedReports = localStorage.getItem('reports');
    if (savedReports) {
        reports.splice(0, reports.length, ...JSON.parse(savedReports));
    }

    const savedSchedules = localStorage.getItem('schedules');
    if (savedSchedules) {
        schedules.splice(0, schedules.length, ...JSON.parse(savedSchedules));
    }

    // 初期表示
    MemberManager.displayMembers();
    MemberManager.populateMemberSelect();
    ReportManager.displayReports();
    ScheduleManager.displaySchedules();

    // ナビゲーション
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 画像アップロード
    uploadBtn.addEventListener('click', () => {
        photoUpload.click();
    });

    photoUpload.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
            fileName.textContent = file.name;
            await ImageUploader.previewImage(file);
        }
    });

    savePhotoBtn.addEventListener('click', async () => {
        const selectedMemberId = memberSelect.value;
        const file = photoUpload.files[0];

        if (!selectedMemberId) {
            UIManager.showNotification('メンバーを選択してください', 'warning');
            return;
        }

        if (!file) {
            UIManager.showNotification('画像ファイルを選択してください', 'warning');
            return;
        }

        const success = await MemberManager.updateMemberPhoto(selectedMemberId, file);
        if (success) {
            // フォームをリセット
            resetUploadForm();
        }
    });

    // 活動報告
    addReportBtn.addEventListener('click', () => {
        UIManager.showReportForm();
    });

    // 予定
    addScheduleBtn.addEventListener('click', () => {
        UIManager.showScheduleForm();
    });

    // モーダル
    closeModal.addEventListener('click', () => {
        UIManager.hideModal();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            UIManager.hideModal();
        }
    });

    // ESCキーでモーダルを閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            UIManager.hideModal();
        }
    });

    // メニュートグル（モバイル）
    menuToggle.addEventListener('click', () => {
        const nav = document.querySelector('nav');
        nav.classList.toggle('hidden');
    });
});

// グローバル関数として公開（HTMLから呼び出すため）
window.ReportManager = ReportManager;
window.ScheduleManager = ScheduleManager;
window.UIManager = UIManager;
window.MemberManager = MemberManager;