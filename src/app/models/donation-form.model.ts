
export class DonationForm {
    donation_form_id: number;
    fk_donor_code: string;
    id_analize_pre_donare: string;
    id_analize_post_donare: string;
    created_at: number;

    constructor(fk_donor_code: string,
        id_analize_pre_donare: string,
        id_analize_post_donare: string,
        created_at: number) {
        this.fk_donor_code = fk_donor_code;
        this.id_analize_post_donare = id_analize_post_donare;
        this.id_analize_pre_donare = id_analize_pre_donare;
        this.created_at = created_at;
    }
}