import { Objective } from '@app/communities/domain/model/entities/objective';
import { ObjetiveSummaryResponseDto } from '../dtos/output/objetive-summary.response.dto';

export class ObjetiveDomainMapper {
  static toObjetiveSummaryDto(objetive: Objective): ObjetiveSummaryResponseDto {
    return {
      id: objetive.id.value,
      name: objetive.name,
      description: objetive.description,
      unit: objetive.unit,
      quantity: objetive.quantity,
      currentAmount: objetive.currentAmount,
    };
  }
}
