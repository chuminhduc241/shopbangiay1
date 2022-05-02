import { ServiceBase } from "config/service-base";

export class ConversationService extends ServiceBase {
  getConversation = async (params) => {
    const { id } = params;
    return await this.get(`/conversations/${id}`);
  };
  getAllConversation = async (params) => {
    return await this.get(`/conversations/getAll`);
  };
  getConversationbyID = async (params) => {
    const { id } = params;
    return await this.get(`/conversations/${id}`);
  };
}
