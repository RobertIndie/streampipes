package de.fzi.cep.sepa.flink.samples.hasher;

import java.io.Serializable;

public interface HashAlgorithm extends Serializable {

	String toHashValue(Object value);
}
