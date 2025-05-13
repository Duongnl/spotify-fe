
export const getNextTrackId = (currentAudio: any, queueTracks: any[]) => {
    for (let i = 0; i < queueTracks.length; i++) {
        if (currentAudio === queueTracks[i].id) {
            const nextIndex = i + 1;
            if (nextIndex < queueTracks.length) {
                return queueTracks[nextIndex].id;
            } else {
                return queueTracks[0].id; // Đã đến cuối danh sách, không phát tiếp
            }
        }
    }
    return null; // Không tìm thấy id hiện tại
};


export const getPreviousTrackId = (currentAudio: any, queueTracks: any[]) => {
    for (let i = 0; i < queueTracks.length; i++) {
        if (currentAudio === queueTracks[i].id) {
            const prevIndex = (i - 1 + queueTracks.length) % queueTracks.length; // Lùi lại, nếu < 0 thì quay về cuối
            return queueTracks[prevIndex].id;
        }
    }
    return null; // Không tìm thấy
};