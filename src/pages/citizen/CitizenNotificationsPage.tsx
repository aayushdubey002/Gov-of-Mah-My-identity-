import React, { useState, useEffect } from 'react';
import { 
  Bell, CheckCircle2, Clock, FileText, ArrowRight, 
  ExternalLink, RefreshCw, ShieldAlert, Sparkles 
} from 'lucide-react';
import { apiService } from '../../services/api';
import { NotificationItem } from '../../types';
import { getText } from '../../utils/localized';

interface CitizenNotificationsPageProps {
  onNavigate: (path: string) => void;
}

export const CitizenNotificationsPage: React.FC<CitizenNotificationsPageProps> = ({ onNavigate }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getNotifications().then((data) => {
      setNotifications(data || []);
      setLoading(false);
    });
  }, []);

  const markAllAsRead = async () => {
    for (const n of notifications) {
      if (!n.read) await apiService.markNotificationRead(n.id);
    }
    const refreshed = await apiService.getNotifications();
    setNotifications(refreshed || []);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 font-serif">Notifications & Alerts</h1>
          <p className="text-xs text-slate-500 mt-0.5">Real-time status updates from connected department APIs</p>
        </div>

        <button
          onClick={markAllAsRead}
          className="text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 cursor-pointer"
        >
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      {loading ? (
        <div className="text-center py-16 text-slate-500">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-emerald-600 mb-2" />
          <p className="font-bold text-sm">Loading notification alerts...</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center text-slate-500 text-xs">
          No notifications yet.
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                if (n.linkUrl) onNavigate(n.linkUrl);
              }}
              className={`bg-white p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 shadow-2xs hover:shadow-md ${
                !n.read ? 'border-emerald-300 bg-emerald-50/30' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  n.type === 'APPROVAL' ? 'bg-emerald-100 text-emerald-800' :
                  n.type === 'INTEROP' ? 'bg-purple-100 text-purple-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  <Bell className="w-4 h-4" />
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{getText(n.title)}</span>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    )}
                  </div>
                  <p className="text-slate-600 leading-relaxed">{getText(n.message)}</p>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {new Date(n.createdAt || Date.now()).toLocaleString()}
                  </span>
                </div>
              </div>

              {n.linkUrl && (
                <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 self-center" />
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
